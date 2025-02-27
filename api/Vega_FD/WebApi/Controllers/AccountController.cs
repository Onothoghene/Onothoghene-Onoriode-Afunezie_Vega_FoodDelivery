using Application.DTOs.Account;
using Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace WebApi.Controllers
{
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IAccountService _accountService;

        public AccountController(IAccountService accountService)
        {
            _accountService = accountService;
        }

        [HttpPost("authenticate")]
        public async Task<IActionResult> AuthenticateAsync(AuthenticationRequest request)
        {
            var result = await _accountService.AuthenticateAsync(request);
            SetRefreshTokenInCookie(result.Data.RefreshToken);
            return Ok(result);
        }

        //[HttpPost("offline/authenticate")]
        //public async Task<IActionResult> OfflineAuthenticateAsync(AuthenticationRequest request)
        //{
        //    var result = await _accountService.AuthenticateAsync(request, isOffline: true);
        //    SetRefreshTokenInCookie(result.Data.RefreshToken);
        //    return Ok(result);
        //}

        [HttpPost("register")]
        public async Task<IActionResult> RegisterAsync(RegisterRequest request)
        {
            return Ok(await _accountService.RegisterAsync(request));
        }

        [HttpPost("verify")]
        [AllowAnonymous]
        public async Task<IActionResult> Verify(OtpRequest request)
        {
            return Ok(await _accountService.VerifyUser(request.Otp));
        }

        //not in use
        [HttpGet("verify-otp/{otp}")]
        public async Task<IActionResult> VerifyOtp(int otp)
        {
            return Ok(await _accountService.VerifyOtp(otp));
        }

        //[HttpPost("forgot-password")]
        //public async Task<IActionResult> ForgotPassword(ForgotPasswordRequest model)
        //{
        //    await _accountService.ForgotPassword(model, Request.Headers["origin"]);
        //    return Ok();
        //}

        [HttpPost("forgot-password")]
        public async Task<IActionResult> ForgotPassword(ForgotPasswordRequest model)
        {
            return Ok(await _accountService.ForgotPassword(model));
        }

        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword(ResetPasswordRequest model)
        {
            return Ok(await _accountService.ResetPassword(model));
        }

        [HttpPost("change-password")]
        public async Task<IActionResult> ChangePassword(ChangePasswordRequest model)
        {
            var response = await _accountService.ChangePassword(model);
            if (response.Succeeded)
            {
                return Ok(response); // 200 OK
            }
            else
            {
                return BadRequest(response); // 400 Bad Request
            }
        }

        [HttpPost("refresh-token")]
        public async Task<IActionResult> RefreshToken(string token)
        {
            var resp = await _accountService.RefreshTokenAsync(token);
            return Ok(resp);
        }

        private string GenerateIPAddress()
        {
            if (Request.Headers.ContainsKey("X-Forwarded-For"))
                return Request.Headers["X-Forwarded-For"];
            else
                return HttpContext.Connection.RemoteIpAddress.MapToIPv4().ToString();
        }

        private void SetRefreshTokenInCookie(string refreshToken)
        {
            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Expires = DateTime.UtcNow.AddDays(10),
            };
            Response.Cookies.Append("refreshToken", refreshToken, cookieOptions);
        }

        [HttpPost("create-admin")]
        public async Task<IActionResult> CreateAdminAsync(RegisterRequest request)
        {
            return Ok(await _accountService.CreateAdmin(request));
        }
    }
}
