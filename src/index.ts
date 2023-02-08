import useReflare from 'reflare';

async function handleRequest(request: Request): Promise<Response> {
  const reflare = await useReflare();

  reflare.push({
    path: '/*',
    upstream: {
      domain: 'github.com',
      protocol: 'https',
      onRequest: (request: Request, url: string): Request => {
        return new Request(url.replace('/', '/electron/electron/releases/download/'), request);
      }
    },
  });

  return reflare.handle(request);
};

addEventListener('fetch', (event) => {
  event.respondWith(handleRequest(event.request));
});
