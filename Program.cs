using Microsoft.EntityFrameworkCore;
using Test.Data;

var builder = WebApplication.CreateBuilder(args);

// Add background service

builder.Services.AddControllersWithViews();
builder.Services.AddSignalR();
builder.Services.AddDbContext<StockExchangeContext>(options =>
    options.UseInMemoryDatabase("StockExchange"));

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

app.UseAuthorization();


app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers();
});

app.MapFallbackToFile("index.html");
app.Run();
