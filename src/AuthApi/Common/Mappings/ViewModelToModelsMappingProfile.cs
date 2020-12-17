using AutoMapper;
using AuthApi.Models;
using ViewModel;

namespace Common.Mappings
{
    public class ViewModelsToModelsMappingProfile : Profile
    {
        public ViewModelsToModelsMappingProfile()
        {
            CreateMap<UserCreateViewModel, Users>()
                .ConstructUsing(u => new Users()
                {
                    Name = u.Name,
                    Surname = u.Surname,
                    Email = u.Email,
                    Password = u.Password
                });
            CreateMap<UserLoginViewModel, Users>()
                .ConstructUsing(u => new Users()
                {
                    Email = u.Email,
                    Password = u.Password
                });
            CreateMap<UserUpdateViewModel, Users>()
                .ConstructUsing(u => new Users()
                {
                    Id = u.Id,
                    Name = u.Name,
                    Surname = u.Surname,
                    Email = u.Email
                });
            CreateMap<UserUpdatePasswordViewModel, Users>()
                .ConstructUsing(u => new Users()
                {
                    Id = u.Id,
                    Password = u.Password
                });
        }
    }
}
