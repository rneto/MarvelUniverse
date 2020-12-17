using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace ViewModel
{
    public class UserUpdatePasswordViewModel
    {
        [Required(ErrorMessage = "The Id is Required")]
        [DisplayName("Guid")]
        public Guid Id { get; set; }

        [Required(ErrorMessage = "The Password is Required")]
        [MinLength(6)]
        [MaxLength(15)]
        [DisplayName("Password")]
        public string Password { get; set; }
    }
}
