# Desafio | BioPark 2023!!!

Tecnologias ->

O código foi escrito em React (Javascript), foi utilizado o S.O windows 10. Para rodar o código basta abrir a raiz do projeto, e no node, dar um "yarn" no terminal do vscode para instalar as dependências e em seguida, "yarn start" para rodar o projeto. De padrão abrirá na localhost do seu pc na porta 3000. 

O sistema trata-se de uma aplicação para controles de aluguel de apartamentos, e as funcionalidades são: 

- Cadastro do usuário (Locador e Locatário)
- Login de usuário (Locador e Locatário)
- Cadastro de um edifício (Perfil Locador)
- Cadastro de um apartamento (Perfil Locador)
- Efetivar o contrato de aluguel (Perfil Locador)
- Listagem de apartamentos (Locador e Locatário)
- Requerimento para contrato de aluguel (Perfil Locatário)
- Vizualizar requerimento de Aluguel (Perfil Locador)
- Vizualizar detalhes do contrato de Aluguel (Perfil Locatário)
- Informativo do Locatário (Perfil Locador)
- Cancelamento do contrato de aluguel (Perfil Locador)
- Logout usuário  (Locador e Locatário)

## Detalhamentos:


### Cadastro de um usuário: (Locador e Locatário)

Para cadastrar um novo usuário você terá que preencher o formulário na página de **sign-up**. Ao clicar no botão **Cadastrar**, vai redirecionar o usuário para a tela de **sign-in** (login).


### Login de usuário: (Locador e Locatário)

Na página de login de usuário, temos um botão chamado **Cadastre-se**, o botão leva para a tela de cadastro **(sign-up)**.


### Página principal (**main**): (Locador e Locatário)

Após o usuário fazer o login ele será redirecionado para a página principal, essa página só poderá ser acessada por usuários que estão logados na aplicação, caso contrário ao tentar acessar a página principal sem estar logado o usuário deverá ser redirecionado para a página de login (**sign-in**).


### Cadastro de um Edifício/Apartamento: (Locador)

Para cadastrar um edifício o usuário deverá clicar no botão **Adicionar Imóvel**, que ficará do lado direito da página principal, abrindo um modal com a opção de adicionar um edfício ou apartamento.

**obs1** só é possível adicionar um apartamento se já existir um edificio cadastrado.
**obs2** o edifício quando cadastrado pode ser vizualizado no botão filtrar.
**obs3** na lista ficam apenas os apartamentos.


### Efetivar o contrato de aluguel: (Perfil Locador)

Para gerar um contrato o usuário deverá clicar no ícone **mão escrevendo**, que se encontra na tabela de contrato de aluguel:
Após preencher os campos e clicar em entregar as chaves será gerado um vincludo com um locatário.

**obs** -> apenas locatários que possuem cadastro serão validados.


### Requerimento para contrato de aluguel: (Perfil Locatário)

É necessário logar no perfil locatário. O mesmo, terá uma visão bem parecida do perfil do Locador, só que sem o botão de **adicionar imóvel**. Para gerar o requerimento basta clicar no botão **documento** (**se existir algum apartamento cadastrado é claro**) e irá aparecer o modal. Após preencher, clique em encaminhar o requerimento. (**tá pertinho de conquistar o sonho cába kkk (;**)


### Listagem de apartamentos (Locador e Locatário)

Se existir apartamentos cadastrados a lista será povoada mostrando os dados dos apartamento e os ícones de ação. (**sem spoiler**)
A lista contém um filtro, que permite o usuário filtrar a tabela por edifício. E no cabeçalho da tabela, em número do apartamento você pode ordenar os dados e facilitar ainda mais a sua busca.

**p.s** o locatário oberva apenas os apartamentos disponíveis.

### Vizualizar requerimento: (Perfil Locador)

Os requerimentos registrados viram solicitação para o Locador, ela pode ser vizualizada abaixo do botão **Cadastrar Imóvel** e contém todas as informações para gerar o contrato.
Para ajudar o nosso trabalhador brasileiro resolvi dar um empurrãozinho e facilitar a contratação (**ou não y.y**) do aluguel. Basta clicar no modal com as informações do requerimento e abrirá as escolhas para aceitar ou não o pedido.

**->** a escolha **sim** efetiva o aluguel, atualizando a lista de apartamentos
**->** a escolha **não** cancela o acordo prévio.

Ambas as opções retiram a solitação do modal, se não existir mais solicitaões o modal desaparece, limpando a tela. (**Mr. M is here**)

## Vizualizar detalhes do contrato: (Perfil Locatário)

Quando um contrato é efetivado via **Contrato de aluguel** ou **Solicitação**, aparecerá ao lado do novo ícone das **chaves** (**com spoiler**) o **olho**, que após ser clicado mostrará o email do locatário e seu nome.


## Cancelamento do contrato de aluguel (Perfil Locador) **darthvader.mp3**

O cancelamento só pode ser feito no perfil do locador (**olha a melhoria vindo...?**), quando o locador clicar nas chaves
abrirá um pequeno popup questionando a sua escolha (**...vai que é miss click, não queremos acabar com o sonho de alguém tão rápido**). Se **não** volta tudo ao normal e o popup some, se **sim** abrirá uma caixa de texto solicitando o email do locatário. Após inserir e enviar (**o sonho acabou**) o contrato será desfeito atualizando a lista e voltando a forma padrão. 

## Deslogar usuário  (Locador e Locatário)

Basta clicar na **porta** ao lado do seu nome escolhido e até a próxima. o/

~só pra finalizar, tentei deixar a experiência de leitura menos cansativa já que você provavelmente vai revisar muitos readme`s e o de back por si só é mais pragmático~

Obrigado por chegar até aqui!!

###### tags: `front-end` `React` `CSS` `desafio` `BioPark` `Trainee`
