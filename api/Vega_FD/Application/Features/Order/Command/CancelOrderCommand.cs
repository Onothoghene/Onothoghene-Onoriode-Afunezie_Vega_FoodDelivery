using Application.Interfaces.Repositories;
using Application.Wrappers;
using AutoMapper;
using MediatR;
using System.Threading;
using System.Transactions;
using System.Threading.Tasks;
using Application.Exceptions;
using Domain.Entities;
using System.Linq;
using System.Runtime.InteropServices;
using Application.Enums;

namespace Application.Features.Order.Command
{
    public class CancelOrderCommand : IRequest<Response<bool>>
    {
        public int OrderId { get; set; }

        public class CancelOrderCommandHandler : IRequestHandler<CancelOrderCommand, Response<bool>>
        {
            private readonly IMapper _mapper;
            private readonly IOrderRepositoryAsync _orderRepository;
            private readonly IRestaurantRepositoryAsync _restaurantRepository;

            public CancelOrderCommandHandler(IMapper mapper, IOrderRepositoryAsync orderRepository,
                                                 IRestaurantRepositoryAsync restaurantRepository)
            {
                _mapper = mapper;
                _orderRepository = orderRepository;
                _restaurantRepository = restaurantRepository;
            }

            public async Task<Response<bool>> Handle(CancelOrderCommand command, CancellationToken cancellationToken)
            {
                using (var ts = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
                {
                  var order = await _orderRepository.GetOrderById(command.OrderId);
                    if (order == null)
                        throw new ApiException("The requested order could not be found");

                    order.Status = (int)OrderEnum.Canceled;
                    await _orderRepository.UpdateAsync(order);

                    ts.Complete();
                }

                return new Response<bool>(true, "The request processed successfully.");
            }
        }
    }
}

