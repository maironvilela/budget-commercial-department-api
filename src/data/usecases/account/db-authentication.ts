// Refatorar

import { Authentication, AuthProps, AuthResponse } from '@/domain';

import { LoadAccountByEmailRepository } from './db-authentication.spec';

export class DbAuthentication implements Authentication {
  constructor(
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
  ) {}

  async auth({ email, password }: AuthProps): Promise<AuthResponse> {
    this.loadAccountByEmailRepository.loadByEmail(email);

    return null;
  }
}

/*
  [ ] Buscar o usuário utilizando email
  [ ] se usuário nao for encontrado, retornar null,
  [ ] validar a senha retornado no usuário da consulta com a senha recebida como parametro
  [ ] if as senhas forem diferente, retornar null
  [ ] Criar o token com o email do usuário e as permissões
  [ ] Criar um refresh token com o id do usuário
  [ ] retorna o token,o refresh token e o nome do usuario
*/
