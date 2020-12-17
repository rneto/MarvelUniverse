using AuthApi.Interfaces;
using AuthApi.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AuthApi.Infrastructure
{
    public class UsersRepository : IUsersRepository
    {
        private readonly MarvelConsoleContext _context;

        public UsersRepository(MarvelConsoleContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }
        public async Task<IEnumerable<Users>> GetAll()
        {
            return await _context.Users
                .ToListAsync();
        }

        public async Task<Users> GetById(Guid id)
        {
            var users = await _context.Users
                  .SingleOrDefaultAsync(u => u.Id == id);
            if (users == null)
            {
                return null;
            }

            return users;
        }

        public async Task<Users> GetByEmailPassword(string email, string password)
        {
            var users = await _context.Users
                  .SingleOrDefaultAsync(u => u.Email == email && u.Password == password);
            if (users == null)
            {
                return null;
            }

            return users;
        }

        public async Task<Users> Add(Users entity)
        {
            _context.Users.Add(entity);
            await _context.SaveChangesAsync();

            return entity;
        }

        public async Task<Users> Update(Users entity)
        {
            Users entityToUpdate = _context.Users
                .Single(b => b.Id == entity.Id);

            entityToUpdate.Name = entity.Name;
            entityToUpdate.Surname = entity.Surname;
            entityToUpdate.Email = entity.Email;

            await _context.SaveChangesAsync();

            return entityToUpdate;
        }

        public async Task<Users> UpdatePassword(Users entity)
        {
            Users entityToUpdate = _context.Users
                .Single(b => b.Id == entity.Id);

            entityToUpdate.Password = entity.Password;

            await _context.SaveChangesAsync();

            return entityToUpdate;
        }

        public void Delete(Guid id)
        {
            Users entityToDelete = _context.Users
                .Single(b => b.Id == id);

            entityToDelete.DeleteDate = DateTime.UtcNow;

            _context.SaveChanges();
        }

    }
}
