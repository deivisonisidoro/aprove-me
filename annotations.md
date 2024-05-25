# Backend

## Domain

<details>
<summary>Entidades</summary>

### Descrição
Entidades são classes que representam os objetos fundamentais do domínio do sistema. Elas encapsulam as propriedades e comportamentos dos objetos do mundo real que elas representam. Cada entidade possui atributos que definem suas características e métodos que definem seu comportamento. As entidades são essenciais para garantir que a lógica de negócios seja aplicada de maneira consistente e que os dados sejam manipulados de forma segura e válida.

### Tarefas
1. **Criar Entidades**
   - Implementar as classes que representam as entidades do domínio.
   - Definir propriedades privadas para cada entidade.
   - Criar construtores para inicializar as propriedades das entidades.
   - Implementar getters e setters com validações apropriadas.

2. **Testar Entidades**
   - Escrever testes usando Jest para garantir o comportamento correto das entidades.
   - Cobrir casos de sucesso e falha nas validações.
   - Verificar a integridade dos dados nas propriedades das entidades.
   - Assegurar que os métodos funcionam conforme o esperado.

</details>

<details>
<summary>Erros Customizados</summary>

### Descrição
As classes de erro customizadas são utilizadas para representar diferentes tipos de erros específicos do domínio da aplicação. Elas estendem a classe Error e são projetadas para fornecer informações claras e úteis sobre o erro que ocorreu, facilitando a depuração e o tratamento de exceções.

### Tarefas
1. **Criar Classes de Erro Customizadas**
   - Implementar classes de erro personalizadas para diferentes tipos de exceções no domínio da aplicação.
   - Definir propriedades adicionais, como códigos de erro ou mensagens específicas.
   - Garantir que as classes de erro forneçam informações relevantes para facilitar o diagnóstico e a resolução de problemas.

</details>

<details>
<summary>Enums</summary>

### Descrição
Enums (ou enumerations) são tipos especiais que permitem a definição de um conjunto de constantes com nomes, facilitando o uso e a manutenção de valores constantes no código. Eles são úteis para representar um conjunto fixo de valores relacionados e são amplamente utilizados para melhorar a legibilidade e a segurança do tipo no código.

### Tarefas
1. **Criar Enums para Mensagens de Validação**
   - Definir enums para centralizar mensagens de validação utilizadas em entidades.
   - Utilizar essas mensagens de validação nas classes de entidades para garantir consistência.

2. **Integrar Enums no Código Existente**
   - Refatorar classes e testes existentes para utilizar enums em vez de strings literais.
   - Garantir que todos os casos de uso relevantes estejam utilizando os enums apropriados.

</details>

<details>
<summary>Either</summary>

### Descrição
A classe `Either` é uma construção de programação funcional que representa um valor com dois possíveis tipos: um "Left" e um "Right". O `Left` é geralmente usado para representar um erro ou um caso inválido, enquanto o `Right` representa um valor correto ou sucesso. Isso permite a modelagem de operações que podem falhar sem recorrer a exceções.

### Tarefas
1. **Implementar Classes Either**
   - Implementar as classes `Left` e `Right` para representar os dois lados de um tipo `Either`.
   - Garantir que ambas as classes possuam métodos para verificar se são `Left` ou `Right`.

2. **Testar Implementações de Either**
   - Escrever testes usando Jest para garantir o comportamento correto das classes `Left` e `Right`.
   - Cobrir casos de sucesso e erro, assegurando que os métodos de verificação funcionem corretamente.
   - Verificar a integridade dos dados armazenados nas instâncias de `Left` e `Right`.

3. **Atualizar Entidades**
   - Remover a utilização de exceções (`throw`) nas classes de entidades.
   - Utilizar a classe `Either` para representar casos de sucesso e erro de forma mais expressiva.
   - Adaptar os testes das entidades para refletir as mudanças e garantir que os casos de uso estejam cobertos.

</details>

<details>
<summary>Fábricas</summary>

### Descrição
As fábricas são classes responsáveis pela criação de instâncias de outras classes, encapsulando a lógica de construção e validação dos objetos. Elas permitem a centralização da lógica de criação, simplificando o código que utiliza essas instâncias e garantindo que todas as validações necessárias sejam realizadas antes da instância ser utilizada.

### Tarefas
1. **Criar Classes de Fábrica**
   - Implementar classes de fábrica para criar instâncias de entidades do domínio.
   - Definir métodos estáticos para criar e validar entidades.
   - Garantir que as fábricas retornem instâncias válidas ou erros de validação.

2. **Testar Fábricas**
   - Escrever testes usando Jest para garantir o comportamento correto das fábricas.
   - Cobrir casos de sucesso e falha nas validações.
   - Verificar que as instâncias criadas pelas fábricas são válidas e consistentes.

</details>

<details>
<summary>DTOs</summary>

### Descrição
Data Transfer Objects (DTOs) são objetos utilizados para transportar dados entre diferentes camadas da aplicação. Eles são especialmente úteis para encapsular e validar dados recebidos ou enviados pela API, garantindo que a estrutura dos dados seja consistente e segura.

### Tarefas
1. **Criar DTOs para Atualização**
   - Implementar classes DTO para a atualização das entidades.
   - Definir propriedades opcionais para permitir atualizações parciais.
   - Garantir que as DTOs sejam usadas para validar os dados de entrada ao atualizar uma entidade.

2. **Criar DTOs para Leitura**
   - Implementar classes DTO para leitura das entidades.
   - Excluir campos sensíveis, como senhas, que não devem ser expostos ao cliente.
   - Garantir que as DTOs representem fielmente os dados das entidades sem expor informações desnecessárias.

</details>

## Application


<details>
<summary>Use Cases</summary>

### Descrição
Os casos de uso (use cases) são responsáveis por orquestrar a lógica de negócios específica de cada funcionalidade da aplicação. Eles representam as operações que podem ser realizadas no sistema e servem como uma camada intermediária entre os controladores e as entidades, garantindo que a lógica de negócios seja aplicada de maneira consistente.

### Tarefas
1. **Criar Casos de Uso**
   - Implementar classes que representam os casos de uso do domínio.
   - Definir métodos específicos para cada operação de negócio, como criação, leitura, atualização e exclusão de entidades.
   - Garantir que as validações e regras de negócios sejam aplicadas de forma consistente.

2. **Testar Casos de Uso**
   - Escrever testes usando Jest para garantir o comportamento correto dos casos de uso.
   - Cobrir casos de sucesso e falha nas operações.
   - Verificar que os métodos dos casos de uso interagem corretamente com os repositórios e entidades.

3. **Integrar Casos de Uso com Controladores**
   - Adaptar os controladores da aplicação para utilizar os casos de uso.
   - Garantir que as respostas aos clientes sejam adequadas e contenham as informações necessárias.
   - Manter a separação de responsabilidades, deixando os casos de uso responsáveis pela lógica de negócios e os controladores responsáveis pela interface com o cliente.

</details>
