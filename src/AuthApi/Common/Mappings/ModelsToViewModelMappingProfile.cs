using AutoMapper;
using AuthApi.Models;
using ViewModel;

namespace Common.Mappings
{
    public class ModelsToViewModelsMappingProfile : Profile
    {
        public ModelsToViewModelsMappingProfile()
        {
            CreateMap<Users, UserDetailsViewModel>();
        }
    }
}
