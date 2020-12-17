using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using ViewModel;

namespace Application.Interfaces
{
    public interface ICryptoService
    {
        string ComputeHash(string data);
    }
}
