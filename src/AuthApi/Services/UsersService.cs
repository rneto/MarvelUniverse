using Application.Interfaces;
using AuthApi.Interfaces;
using AuthApi.Models;
using AutoMapper;
using System;
using System.Threading.Tasks;
using ViewModel;

namespace Application.Services
{
    public class UsersService: IUsersService
    {
        private readonly IMapper _mapper;
        private readonly IUsersRepository _usersRepository;
        private readonly ICryptoService _cryptoService;

        public UsersService(IMapper mapper,
                            IUsersRepository usersRepository,
                            ICryptoService cryptoService)
        {
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
            _usersRepository = usersRepository ?? throw new ArgumentNullException(nameof(usersRepository));
            _cryptoService = cryptoService ?? throw new ArgumentNullException(nameof(cryptoService));
        }

        public async Task<UserDetailsViewModel> GetById(Guid id)
        {
            Users user = await _usersRepository.GetById(id);

            if (user != null && user.DeleteDate != null)
            {
                user = null;
            }

            return _mapper.Map<UserDetailsViewModel>(user);
        }

        public async Task<UserDetailsViewModel> Create(UserCreateViewModel userViewModel)
        {
            var user = new Users()
            {
                Id = Guid.NewGuid(),
                Name = userViewModel.Name,
                Surname = userViewModel.Surname,
                Email = userViewModel.Email,
                Password = _cryptoService.ComputeHash(userViewModel.Password)
            };

            return _mapper.Map<UserDetailsViewModel>(await _usersRepository.Add(user));
        }

        public async Task<UserDetailsViewModel> Login(UserLoginViewModel userViewModel)
        {
            Users user = await _usersRepository.GetByEmailPassword(userViewModel.Email,
                _cryptoService.ComputeHash(userViewModel.Password));

            if (user != null && user.DeleteDate != null)
            {
                user = null;
            }

            return _mapper.Map<UserDetailsViewModel>(user);
        }

        public async Task<UserDetailsViewModel> Update(UserUpdateViewModel userViewModel)
        {
            var updateUser = _mapper.Map<Users>(userViewModel);

            return _mapper.Map<UserDetailsViewModel>(await _usersRepository.Update(updateUser));
        }

        public async Task<UserDetailsViewModel> UpdatePassword(UserUpdatePasswordViewModel userViewModel)
        {
            var updateUser = _mapper.Map<Users>(userViewModel);
            updateUser.Password = _cryptoService.ComputeHash(updateUser.Password);

            return _mapper.Map<UserDetailsViewModel>(await _usersRepository.UpdatePassword(updateUser));
        }

        public async Task Delete(Guid id)
        {
            await Task.Run(() => _usersRepository.Delete(id));
        }
    }
}
