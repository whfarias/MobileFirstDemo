# MobileFirstDemo
Demonstração do uso do MobileFirst e Cloudant no Bluemix


Pré-Requisitos
Instalar o Ionic e o Cordova

Fazer um clone do projeto: git clone
Instale o MobileFirst Development Kit descrito na URL:https://mobilefirstplatform.ibmcloud.com/tutorials/en/foundation/8.0/all-tutorials/
Registre a sua App no MobileFirst utilizando o comando App_Dir\mfpdev app register (nome do server)

Verificar as configurações do MobileFirst se o parametro da URL do server está configurado corretamente que está no \config.xml
  <mfp:server runtime="mfp" url="URL_MFP" />

Criar um Banco de Dados usando o Cloudant.
Entrar no arquivo adapter.xml do diretório SaveImageAdapter e trocar as configurações do Cloudant:
        <domain>URL CLOUDANT</domain>
        <port>Porta</port>

        <serverIdentity>
            <username>Usuario</username>
            <password>Senha</password>
        </serverIdentity>

Realizar o deployment do adapter SaveImageAdapter
\Adapter_DIR\ mfpdev adapter build \Adapter_DIR\ mfpdev adapter deploy

Gerar o projeto do Xcode usando o Ionic com o comando App_Dir\ionic build ios
ou Android App_Dir\ionic build android

Após isso testar usando o Simulador ou Device.
