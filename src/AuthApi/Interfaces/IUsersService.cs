using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using ViewModel;

namespace Application.Interfaces
{
    public interface IUsersService
    {
        Task<UserDetailsViewModel> GetById(Guid id);
        Task<UserDetailsViewModel> Create(UserCreateViewModel userViewModel);
        Task<UserDetailsViewModel> Login(UserLoginViewModel userViewModel);
        Task<UserDetailsViewModel> Update(UserUpdateViewModel userViewModel);
        Task<UserDetailsViewModel> UpdatePassword(UserUpdatePasswordViewModel userViewModel);
        Task Delete(Guid id);
    }
}
