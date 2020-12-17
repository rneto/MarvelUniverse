using System;
using System.Collections.Generic;

namespace AuthApi.Models
{
    public partial class Users
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public DateTimeOffset? CreationDate { get; set; }
        public DateTimeOffset? DeleteDate { get; set; }
    }
}
