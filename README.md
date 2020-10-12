## Service Worker

- O service worker é um **script** que roda em segundo plano na sua aplicação
- Ele possui capacidade de interceptar e gerenciar solicitações de rede, funciona como uma espécie de **proxy de rede**
- Não manipula a DOM da sua pagina diretamente, pois é um **Web Worker**

## Pre requisitos

- Você precisa de HTTPS
  > Service Worker é algo muito poderoso, caso um intermediario mal intencionado consiga poder sobre seu service worker isso poderia ser bem prejudicial
- navegadores compativeis
  > Service Worker é um recurso ja aceito pela grande maioria dos navegadores

## O que posso fazer ?

- push de notificações
- cache de arquivos estáticos
- modificar requisições mandadas ou recebidas antes de chegar ao cliente