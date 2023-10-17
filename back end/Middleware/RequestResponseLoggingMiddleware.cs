using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace TaskApplication.Middleware
{
    public class RequestResponseLoggingMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly string logFilePath;

        public RequestResponseLoggingMiddleware(RequestDelegate next, string logFilePath)
        {
            _next = next;
            this.logFilePath = logFilePath;
        }


        public async Task Invoke(HttpContext context)
        {
            //var request = context.Request;
            var requestBody = await FormatRequest(context.Request);

            var originalBodyStream = context.Response.Body;
            using (var responseBody = new MemoryStream())
            {
                context.Response.Body = responseBody;

                await _next(context);

                var responseBodyData = await FormatResponse(context.Response);

                // Log the request and response data to a file
                LogToLogFile(requestBody, responseBodyData);
                responseBody.Seek(0, SeekOrigin.Begin);
                await responseBody.CopyToAsync(originalBodyStream);
            }
        }

        private async Task<string> FormatRequest(HttpRequest request)
        {
            request.EnableBuffering();
            var body = request.Body;
            var buffer = new byte[Convert.ToInt32(request.ContentLength)];
            await request.Body.ReadAsync(buffer, 0, buffer.Length);
            var requestBody = Encoding.UTF8.GetString(buffer);
            request.Body.Seek(0, SeekOrigin.Begin);
            return $"{request.Scheme} {request.Host}{request.Path} {request.QueryString} {requestBody}";
        }

        private async Task<string> FormatResponse(HttpResponse response)
        {
            response.Body.Seek(0, SeekOrigin.Begin);
            var responseBody = await new StreamReader(response.Body).ReadToEndAsync();
            response.Body.Seek(0, SeekOrigin.Begin);
            return responseBody;
        }

        private void LogToLogFile(string request, string response)
        {
            File.AppendAllText(logFilePath, $"{DateTime.UtcNow} - Request: {request} \nResponse: {response}\n\n");
        }
    }
}
