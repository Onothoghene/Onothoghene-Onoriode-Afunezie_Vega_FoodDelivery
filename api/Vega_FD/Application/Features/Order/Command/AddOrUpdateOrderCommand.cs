using Application.Interfaces.Repositories;
using Application.Wrappers;
using AutoMapper;
using MediatR;
using System.Threading;
using System.Transactions;
using System.Threading.Tasks;
using Application.Exceptions;
using System.Collections.Generic;
using Application.DTOs.Orders;
using Domain.Entities;
using System.Linq;
using Application.Interfaces;

namespace Application.Features.Order.Command
{
    public class AddOrUpdateOrderCommand : IRequest<Response<int>>
    {
        public int? Id { get; set; }
        public int RestaurantId { get; set; }
        public decimal TotalAmount { get; set; }
        public int Status { get; set; }
        public decimal AmountPaid { get; set; }
        public int PaymentOption { get; set; }
        public int PaymentStatus { get; set; }
        public List<OrderItemsIM> OrderItems { get; set; }

        public class AddOrUpdateOrderCommandHandler : IRequestHandler<AddOrUpdateOrderCommand, Response<int>>
        {
            private readonly IMapper _mapper;
            private readonly IOrderRepositoryAsync _orderRepository;
            private readonly IRestaurantRepositoryAsync _restaurantRepository;
            private readonly ICartItemRepository _cartItemRepository;
            private readonly IAuthenticatedUserService _userService;
            private readonly IPaymentRepositoryAsync _paymentRepository;

            public AddOrUpdateOrderCommandHandler(IMapper mapper, IOrderRepositoryAsync orderRepository,
                                                 IRestaurantRepositoryAsync restaurantRepository,
                                                 ICartItemRepository cartItemRepository,
                                                 IAuthenticatedUserService userService,
                                                 IPaymentRepositoryAsync paymentRepository)
            {
                _mapper = mapper;
                _orderRepository = orderRepository;
                _restaurantRepository = restaurantRepository;
                _cartItemRepository = cartItemRepository;
                _userService = userService;
                _paymentRepository = paymentRepository;
            }

            public async Task<Response<int>> Handle(AddOrUpdateOrderCommand command, CancellationToken cancellationToken)
            {
                Orders order;

                using (var ts = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
                {
                    var userId = _userService.UserId;
                    

                    if (command.Id.HasValue && command.Id.Value > 0)
                    {
                        // Fetch existing order
                        order = await _orderRepository.GetByIdAsync(command.Id.Value);
                        if (order == null)
                            throw new ApiException("Order not found.");

                        // Use AutoMapper to update the existing order
                        _mapper.Map(command, order);

                        // Update OrderItems
                        foreach (var itemDto in command.OrderItems)
                        {
                            var existingItem = order.OrderItems.FirstOrDefault(i => i.FoodId == itemDto.FoodId);
                            if (existingItem != null)
                            {
                                _mapper.Map(itemDto, existingItem); // Map updates to existing items
                            }
                            else
                            {
                                var newItem = _mapper.Map<OrderItems>(itemDto);
                                order.OrderItems.Add(newItem);
                            }
                        }

                        await _orderRepository.UpdateAsync(order);
                    }
                    else
                    {
                        // Create new order
                        order = _mapper.Map<Orders>(command);
                        await _orderRepository.AddAsync(order);
                    }

                    // Handle Payment Processing
                    var payment = await _paymentRepository.GetPaymentByOrderIdAsync(order.Id);
                    if (payment != null)
                    {
                        payment.AmountPaid = command.AmountPaid;
                        await _paymentRepository.UpdateAsync(payment);
                    }
                    else
                    {
                        var newPayment = new Domain.Entities.Payment
                        {
                            OrderId = order.Id,
                            AmountPaid = command.AmountPaid,
                            PaymentOption = command.PaymentOption,
                            PaymentStatus = command.PaymentStatus
                        };
                        await _paymentRepository.AddAsync(newPayment);
                    }

                    // Update Restaurant Availability
                    var restaurant = await _restaurantRepository.GetByIdAsync(command.RestaurantId);
                    if (restaurant != null)
                    {
                        restaurant.IsAvailable = false; // Set restaurant as unavailable
                        await _restaurantRepository.UpdateAsync(restaurant);
                    }

                    //set the items in the cart Ordered to true which signifies that the menu item has been bought at this time 
                    var cartItemIds = command.OrderItems.Select(x => x.FoodId).ToList();
                    var cartItems = await _cartItemRepository.GetCartItemsAsync(userId, cartItemIds);
                    if (cartItems != null && cartItems.Count() > 0)
                    {
                        foreach (var cartItem in cartItems)
                        {
                            cartItem.Ordered = true;

                            await _cartItemRepository.UpdateAsync(cartItem);
                        }
                    }

                    ts.Complete();
                }

                return new Response<int>(order.Id, "Request processed successfully.");
            }
        }
    }
}

