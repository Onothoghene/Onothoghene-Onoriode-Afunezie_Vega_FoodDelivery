﻿using Application.Features.Address.Command;
using Application.Features.Comment.Command;
using Application.Features.Order.Command;
using Application.Features.Order.Query;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace WebApi.Controllers.v1
{
    [Authorize]
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/[controller]")]
    public class OrderController : BaseApiController
    {
        [HttpGet("user/{userId?}")]
        public async Task<IActionResult> GetUserOrders(int userId)
        {
            return Ok(await Mediator.Send(new GetUserOrdersQuery { userId = userId }));
        }

        [HttpGet("{Id}")]
        public async Task<IActionResult> GetOrderById(int Id)
        {
            return Ok(await Mediator.Send(new GetOrderByIdQuery { orderId = Id }));
        }

        [HttpGet("restaurant/{restaurantId?}")]
        public async Task<IActionResult> GetRestaurantOrder(int restaurantId)
        {
            return Ok(await Mediator.Send(new GetRestaurantOrdersQuery { restaurantId = restaurantId }));
        }

        [HttpGet("")]
        public async Task<IActionResult> GetAllOrders()
        {
            return Ok(await Mediator.Send(new GetAllOrdersQuery()));
        }

        [HttpPut("")]
        public async Task<IActionResult> AddOrUpdateOrder(AddOrUpdateOrderCommand command)
        {
            return Ok(await Mediator.Send(command));
        }

        [HttpPut("cancel")]
        public async Task<IActionResult> CancelOrder(CancelOrderCommand command)
        {
            return Ok(await Mediator.Send(command));
        }

        [HttpDelete("{Id}")]
        public async Task<IActionResult> DeleteOrder(int Id)
        {
            return Ok(await Mediator.Send(new DeleteOrderCommand { orderId = Id }));
        }

        [HttpGet("summary/{orderId}")]
        public async Task<IActionResult> GetOrderSummary(int orderId)
        {
            return Ok(await Mediator.Send(new GetOrderSummaryQuery { orderId = orderId }));
        }

    }
}
