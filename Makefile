start:
	@echo Iniciando a aplicação
	npm start

install:
	@echo Instalando dependências
	npm install

init:
	@echo Instalando dependências
	npm install && npm start

test:
	npm test

coverage: 
	npm run coverage

build:
	npm run build

.PHONY: start install init test build coverage
