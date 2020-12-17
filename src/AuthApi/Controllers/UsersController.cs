using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using ViewModel;

namespace AuthApi.Controllers
{
    // TODO: Enable authorization when supported.
    //[Authorize]
    [EnableCors("DefaultCorsPolicy")]
    [ApiController]
    [Route("")]
    public class UsersController : ControllerBase
    {

        private readonly ILogger<UsersController> logger;
        private readonly IUsersService usersService;

        public UsersController(ILogger<UsersController> logger,
                               IUsersService usersService)
        {
            this.logger = logger;
            this.usersService = usersService;
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("users")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<UserDetailsViewModel>> Create(UserCreateViewModel userViewModel)
        {
            try
            {
                UserDetailsViewModel user = await usersService.Create(userViewModel);
                return CreatedAtAction(nameof(Details), new { id = user.Id }, user);
            }
            catch (Exception)
            {
                return BadRequest("Error creating user.");
            }
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("login")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<UserDetailsViewModel>> Login(UserLoginViewModel userViewModel)
        {
            try
            {
                UserDetailsViewModel user = await usersService.Login(userViewModel);

                if (user == null)
                {
                    return BadRequest("Error login user.");
                }

                // TODO: Generate JWT token.
                return CreatedAtAction(nameof(Details), new { id = user.Id }, user);
            }
            catch (Exception)
            {
                return BadRequest("Error login user.");
            }
        }

        [HttpGet]
        [Route("users-details")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<UserDetailsViewModel>> Details(Guid id)
        {
            try
            {
                UserDetailsViewModel user = await usersService.GetById(id);

                if (user == null)
                {
                    return BadRequest("Error getting user.");
                }

                return Ok(user);
            }
            catch (Exception)
            {
                return BadRequest("Error getting user.");
            }
        }

        [HttpPut]
        [Route("users-update")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<UserDetailsViewModel>> Update(UserUpdateViewModel userViewModel)
        {
            try
            {
                UserDetailsViewModel user = await usersService.Update(userViewModel);

                if (user == null)
                {
                    return BadRequest("Error updating user");
                }

                return CreatedAtAction(nameof(Details), new { id = user.Id }, user);
            }
            catch (Exception)
            {
                return BadRequest("Error updating user.");
            }
        }

        [HttpPut]
        [Route("users-update-password")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<UserDetailsViewModel>> UpdatePassword(UserUpdatePasswordViewModel userViewModel)
        {
            try
            {
                UserDetailsViewModel user = await usersService.UpdatePassword(userViewModel);

                if (user == null)
                {
                    return BadRequest("Error updating user password.");
                }

                return CreatedAtAction(nameof(Details), new { id = user.Id }, user);
            }
            catch (Exception)
            {
                return BadRequest("Error updating user password.");
            }
        }

        [HttpDelete]
        [Route("users-delete")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public async Task<ActionResult<UserDetailsViewModel>> Delete(Guid id)
        {
            try
            {
                UserDetailsViewModel user = await usersService.GetById(id);

                if (user == null)
                {
                    return BadRequest("Error deleting user.");
                }

                await Task.Run(() => usersService.Delete(id)); 

                return NoContent();
            }
            catch (Exception)
            {
                return BadRequest("Error deleting user.");
            }
        }
    }
}
