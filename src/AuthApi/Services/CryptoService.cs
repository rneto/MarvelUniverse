using Application.Interfaces;
using System;
using System.Security.Cryptography;
using System.Text;

namespace Application.Services
{
    public class CryptoService : ICryptoService
    {
        public string ComputeHash(string data)
        {
            using (SHA256 sha256Hash = SHA256.Create())
            {
                byte[] _data = sha256Hash.ComputeHash(Encoding.UTF8.GetBytes(data));
                var stringBuilder = new StringBuilder();

                for (int i = 0; i < _data.Length; i++)
                {
                    stringBuilder.Append(_data[i].ToString("x2"));
                }

                return stringBuilder.ToString();
            }
        }
        public bool VerifyHash(string data, string hash)
        {
            var dataHash = ComputeHash(data);

            StringComparer comparer = StringComparer.OrdinalIgnoreCase;

            return comparer.Compare(dataHash, hash) == 0;
        }
    }
}
