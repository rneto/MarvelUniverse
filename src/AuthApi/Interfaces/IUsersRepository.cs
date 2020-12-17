using AuthApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AuthApi.Interfaces
{
    public interface IUsersRepository
    {
        Task<IEnumerable<Users>> GetAll();
        Task<Users> GetById(Guid id);
        Task<Users> GetByEmailPassword(string email, string password);
        Task<Users> Add(Users user);
        Task<Users> Update(Users user);
        Task<Users> UpdatePassword(Users user);
        void Delete(Guid id);
    }
}
