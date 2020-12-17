using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace ViewModel
{
    public class UserUpdateViewModel
    {
        [Required(ErrorMessage = "The Id is Required")]
        [DisplayName("Guid")]
        public Guid Id { get; set; }

        [Required(ErrorMessage = "The Name is Required")]
        [MinLength(2)]
        [MaxLength(100)]
        [DisplayName("Name")]
        public string Name { get; set; }

        [Required(ErrorMessage = "The Surname is Required")]
        [MinLength(2)]
        [MaxLength(100)]
        [DisplayName("Surname")]
        public string Surname { get; set; }

        [Required(ErrorMessage = "The Email is Required")]
        [EmailAddress]
        [DisplayName("Email")]
        public string Email { get; set; }
    }
}
