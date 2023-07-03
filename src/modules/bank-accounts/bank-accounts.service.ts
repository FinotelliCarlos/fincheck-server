import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBankAccountDto } from './dto/create-bank-account.dto';
import { UpdateBankAccountDto } from './dto/update-bank-account.dto';
import { BankAccountsRepository } from 'src/shared/database/repositories/bank-accounts.repositories';

@Injectable()
export class BankAccountsService {
  constructor(private readonly bankAccountsRepo: BankAccountsRepository) { }

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
    const isOwner = await this.bankAccountsRepo.findFirst({
      where: {
        id: bankAccountId,
        userId
      }
    })

    if (!isOwner) {
      throw new NotFoundException('Bank account not found.')
    }

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

  async remove(userId: string,
    bankAccountId: string,) {
    const isOwner = await this.bankAccountsRepo.findFirst({
      where: {
        id: bankAccountId,
        userId
      }
    })

    if (!isOwner) {
      throw new NotFoundException('Bank account not found.')
    }

    await this.bankAccountsRepo.delete({
      where: {
        id: bankAccountId
      },
    })

    return null
  }
}
