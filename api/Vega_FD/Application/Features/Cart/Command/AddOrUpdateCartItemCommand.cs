using Application.Interfaces.Repositories;
using Application.Wrappers;
using AutoMapper;
using MediatR;
using System.Threading;
using System.Transactions;
using System.Threading.Tasks;
using Application.Exceptions;
using Domain.Entities;
using Application.Interfaces;

namespace Application.Features.Cart.Command
{
    public class AddOrUpdateCartItemCommand : IRequest<Response<bool>>
    {
        public int Quantity { get; set; }
        public int FoodId { get; set; }

        public class AddOrUpdateCartItemCommandHandler : IRequestHandler<AddOrUpdateCartItemCommand, Response<bool>>
        {
            private readonly IMapper _mapper;
            private readonly ICartItemRepository _cartItemRepository;
            private readonly IAuthenticatedUserService _userService;

            public AddOrUpdateCartItemCommandHandler(IMapper mapper, ICartItemRepository cartItemRepository,
                                                    IAuthenticatedUserService userService)
            {
                _mapper = mapper;
                _cartItemRepository = cartItemRepository;
                _userService = userService;
            }

            public async Task<Response<bool>> Handle(AddOrUpdateCartItemCommand command, CancellationToken cancellationToken)
            {
                using (var ts = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
                {
                    var userId = _userService.UserId;
                    // Check if the item already exists in the user's cart
                    var item = await _cartItemRepository.GetUserMenuCartAsync(userId, command.FoodId);
                    if (item != null)
                    {
                        // Instead of replacing, increment the quantity
                        item.Quantity = command.Quantity;
                        await _cartItemRepository.UpdateAsync(item);
                    }
                    else
                    {
                        var data = _mapper.Map<CartItems>(command);
                        await _cartItemRepository.AddAsync(data);
                    }
                    ts.Complete();
                }

                return new Response<bool>(true, "Add item to cart successfully.");
            }
        }
    }
}

