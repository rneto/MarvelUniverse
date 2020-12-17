using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace ViewModel
{
    public class UserDetailsViewModel
    {
        [Key]
        public Guid Id { get; set; }

        [DisplayName("Name")]
        public string Name { get; set; }

        [DisplayName("Surname")]
        public string Surname { get; set; }

        [DisplayName("Email")]
        public string Email { get; set; }
    }
}
