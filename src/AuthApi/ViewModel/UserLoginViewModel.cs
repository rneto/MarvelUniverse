using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace ViewModel
{
    public class UserLoginViewModel
    {
        [Required(ErrorMessage = "The Email is Required")]
        [EmailAddress]
        [DisplayName("Email")]
        public string Email { get; set; }

        [Required(ErrorMessage = "The Password is Required")]
        [MinLength(6)]
        [MaxLength(15)]
        [DisplayName("Password")]
        public string Password { get; set; }
    }
}
