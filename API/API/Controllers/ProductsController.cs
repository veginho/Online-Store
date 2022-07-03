using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Models;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class ProductsController : ControllerBase
	{
		private AmanetStoreContext _db;
		public ProductsController(AmanetStoreContext db)
		{
			_db = db;
		}

		[HttpGet("productlist")]
		public List<Product> GetProducts()
		{
			List<Product> products = _db.Products.ToList();//preia lista de produse din baza de date sub format JSON
			return products;
		}

		[HttpPost("comanda")]
		public IActionResult AddProducts([FromBody] List<CartItems> cartItems)
		{
			foreach (var item in cartItems)
			{
				var totalPlata=0;
				if(item.qty>_db.Products.Where(a=>item.produs.Id==a.Id).Select(a=>a.Quantity).FirstOrDefault())
				{
					return new JsonResult("Cantitatea nu este disponibila in stoc");
				}
				else
				{
					ShopList shop=new ShopList();
					totalPlata += item.qty * item.produs.Price;
					shop.UserId = Utils.userId;
					if(shop.UserId==0)
					{
						return new JsonResult("Va trebui sa va logati ca sa putem finaliza comanda");
					}
					shop.ProductId = item.produs.Id;
					_db.ShopLists.Add(shop);
					var aux = _db.Products.Single(a => item.produs.Id == a.Id);//luam randul din baza de date si ii vom modifica valoarea

					aux.Quantity -= item.qty;
					_db.SaveChanges();
				}
			}
			return new JsonResult("Comanda a fost plasata cu succes");
		}



		[HttpPost("updateprice")]
		public IActionResult updatePrice([FromBody] UpdatePrice updatePrice)
		{
			var aux = _db.Products.Single(a => a.Id == updatePrice.IDProdus);
			aux.Price = updatePrice.PretNou;
			_db.SaveChanges();
			return new JsonResult("Update cu succes");
		}


		[HttpPost("filter")]
		public List<Product> FilterPrice([FromBody] Filter filtre)
		{
			List<Product> products = new List<Product>();
			if(filtre.SortType == null)
            {
				List<Product> list = _db.Products.Where(a => a.Price >= filtre.Minim && a.Price <= filtre.Maxim).ToList();
				products = list;
				//return list;
			}
			if(filtre.SortType == "Descrescator")
            {
				List<Product> list = _db.Products.Where(a => a.Price >= filtre.Minim && a.Price <= filtre.Maxim).OrderBy(x=>x.Price).ToList();
				products = list;
				//return list;
			}
			if (filtre.SortType == "Crescator")
			{
				List<Product> list = _db.Products.Where(a => a.Price >= filtre.Minim && a.Price <= filtre.Maxim).OrderByDescending(x => x.Price).ToList();
				products = list;
				//return list;
			}
			return products;
		}

	}

	
	
}
