# PWA
- desenvolver uma aplicação que será utilizada tanto para versão mobile, web e desktop
- mais vantagens para desenvolvedores, porém as vantagens para o usuário não são aparentes

## O grande segredo: Service Worker

- O service worker é um **script** que roda em segundo plano na sua aplicação
- Ele possui capacidade de interceptar e gerenciar solicitações de rede, funciona como uma espécie de **proxy de rede**
- Não manipula a DOM da sua pagina diretamente, pois é um **Web Worker**

## Pré requisitos

- Você precisa de HTTPS
  > Service Worker é algo muito poderoso, caso um intermediario mal intencionado consiga poder sobre seu service worker isso poderia ser bem prejudicial
- navegadores compativeis
  > Service Worker é um recurso ja aceito pela grande maioria dos navegadores

## O que posso fazer ?

- push de notificações
- cache de arquivos estáticos
- controle de requisições mandadas ou recebidas antes de chegar ao cliente

## Construção do projeto

- identificar qual será teu ambiente principaç
  - web
  - mobile
  - desktop
- manter o layout sempre responsivo
- gerenciar o cache correto daquelas informações que serão uteis manter disponiveis para o usuario quando offline

## Ok.. E agora?

- Gerar build .apk da sua pwa

# TWA (Truested Web Activities)
- Um aplicativo é...   o navegador
- Protocolo baseado em guias personalizadas
- Dono do site, deve ser o mesmo do APP
## Como transformar minha PWA em uma TWA?
- Gerar uma chave para confirmar que você é o dono do site
- Mão na massa!
- [pwa2apk](https://pwa2apk.com/)

## vantagens

- super facil
- todas as funcionalidades da web
- sempre atualizado!

## contras

- apenas para android
- sem funcionalidades nativas
- monetização

# Voltando ao Serivce Worker

## Lifecycle

Navegadores que suportam o service worker possuem uma propriedade serviceWorker, com ela podemos registrar o nosso próprio

REGISTER -> INSTALL -> ACTIVATE

## Arquivo principal
```javascript
// Verificando se o navegador suporta ServiceWorkers
  if('serviceWorker' in navigator) {

// O evento de load é acionado quando um recurso e seus recursos
// dependentes terminaram de carregar.    
    window.addEventListener('load', async () => {

// Após o site ter carregado iremos registrar nosso serviceWorker em nosso browser
      try {
          const registration = await navigator.serviceWorker.register('caminho para seu serviceWorker')
          console.log('Service Worker Registrado!')

          // registrar a aplicação para receber pushs
          const subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array('chave VAPID pública')
          })
      } catch(error) {
        console.error('Erro :c', error)
      }
        
          
    })
  }
```
## Service Worker cacheando arquivos

- **INSTALL:** cacheamos os arquivos desejados
- **ACTIVATE:** limpamos caches obsoletos
- **FETCH:** dizer ao browser que ele deve mostrar o cache quando offline

```javascript

// identificador de versão do seu cache
// do qual você gostaria de ter, para ter controle sobre
// os arquivos que você mantem em cache
const cacheName = 'v1'

// Todos os arquivos que você deseja manter em cache
const cacheAssets = [
  'home.html',
  'dashboard.html',
  '/css/estilos.css',
  '/js/arquivo.js',
]

// Instalar o Service Worker
self.addEventListener('install', (event) => {
// o evento de install é disparado quando um novo
// service worker registrado é instalado no navegador
  console.log('Service Worker instalado')

// vamos cachear nossos arquivos
// aqui você diz para o browser aguardar até que o evento de instalação tenha terminado
  event.waitUnitl(
    // Damos um nome ao nosso cache e "abrimos"
    // e nos é devolvido um objeto de cache
    caches
      .open(cacheName)
      .then(cache => {
        cache.addAll(cacheAssets)
      })
      .then(() => self.skipWaiting())
  )
})

// Ativando o service worker e limpando caches antigos
self.addEventListener('activate', (event) => {
  console.log('Service Worker ativado')

  // removendo caches desnecessarios
  event.waitUntil(
    caches
      .keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cache => {
            if(cache !== cacheName)
            return caches.delete(cache)
          })
      })
  )
})

// mostrar nosso cache quando offline
// ou interceptar o que quisermos aqui
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request)
      .then(() => console.log('tudo sussa!'))
      .catch((error) => caches.match(event.request))
    )
})
```

## Service Worker Mandando Push Notifications

- Chaves VAPID
> Estas fazem com que seu servidor voluntariamente consiga ter uma identidade, fazendo com que somente o servidor da mesma aplicação possa enviar push's de notificação para seu cliente
- Chave publica e chave privada
> O seu servidor terá a chave publica e a privada, que ele usará para poder enviar o push ao destino, o seus clientes somente terão a chave pública
- Autorização
> para que você possa mandar um push de notificação você tera que pedir permissão do seu usuário, utilizando `Notification.requestPermission()`, caso ele permita, você terá uma inscrição, como se fosse um endereço para esse cliente, do qual você deve guardar no banco de dados relacionado com este seu usuário se necessário.
- Boas práticas
> Nunca saia apenas perguntando ao usuário se ele deseja receber notificações de cara, primeiro apresente os benefícios de ele conceder tal permissão, assim sua quantidade de usuários com notificações será maior,

```javascript
// ouvindo todo evento de push notification que é mandado
self.addEventListener('push', event => {
// dados enviados no push
  const data = event.data.json()

  // mostrando notificação
  self.registration.showNotification(data.title, {
    body: data.body
  })
})
```

### Referencia detalhada
- [Web Push resumido](https://web-push-book.gauntface.com/)
- [Protocolos de Web Push](https://tools.ietf.org/html/draft-ietf-webpush-protocol-12)
