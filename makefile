
migrate: 
	npx prisma migrate dev --name init 


prisma-init: 
	npx prisma init --datasource-provider postgresql 

generate:
	npx prisma generate