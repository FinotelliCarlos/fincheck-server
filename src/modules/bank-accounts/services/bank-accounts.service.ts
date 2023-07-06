import { Injectable } from '@nestjs/common';
import { BankAccountsRepository } from 'src/shared/database/repositories/bank-accounts.repositories';
import { CreateBankAccountDto } from '../dto/create-bank-account.dto';
import { UpdateBankAccountDto } from '../dto/update-bank-account.dto';
import { ValidateBankAccountOwnershipService } from './validate-bank-account-ownership.service';

@Injectable()
export class BankAccountsService {
  constructor(
    private readonly bankAccountsRepo: BankAccountsRepository,
    private readonly validateService: ValidateBankAccountOwnershipService
  ) { }


  create(userId: string, createBankAccountDto: CreateBankAccountDto) {
    const { name, initialBalance, type, color } = createBankAccountDto

    return this.bankAccountsRepo.create({
      data: {
        userId,
        name,
        initialBalance,
        type,
        color,
      }
    })
  }

  findAllByUserId(userId: string) {
    return this.bankAccountsRepo.findMany({
      where: {
        userId
      }
    })
  }

  async update(userId: string,
    bankAccountId: string,
    updateBankAccountDto: UpdateBankAccountDto
  ) {
    await this.validateService.validate(userId, bankAccountId)

    const { name, initialBalance, type, color } = updateBankAccountDto

    return this.bankAccountsRepo.update({
      where: {
        id: bankAccountId
      },
      data: {
        name,
        initialBalance,
        type,
        color
      }
    })
  }

  async remove(
    userId: string,
    bankAccountId: string
  ) {
    await this.validateService.validate(userId, bankAccountId)

    await this.bankAccountsRepo.delete({
      where: {
        id: bankAccountId
      },
    })

    return null
  }
}
