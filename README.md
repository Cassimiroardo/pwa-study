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