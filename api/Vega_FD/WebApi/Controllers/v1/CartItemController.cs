using Application.Features.Cart.Command;
using Application.Features.Cart.Query;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace WebApi.Controllers.v1
{
    [Authorize]
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/[controller]")]
    public class CartItemController : BaseApiController
    {
        [HttpGet("user")]
        public async Task<IActionResult> GetMenuItemComments()
        {
            return Ok(await Mediator.Send(new GetUserCartItemQuery()));
        }

        [HttpPut("")]
        public async Task<IActionResult> AddOrUpdateCartItem(AddOrUpdateCartItemCommand command)
        {
            return Ok(await Mediator.Send(command));
        }

        [HttpDelete("{Id}")]
        public async Task<IActionResult> RemoveCartItem(int Id)
        {
            return Ok(await Mediator.Send(new RemoveCartItemCommand { cartItemId = Id }));
        }

    }
}
