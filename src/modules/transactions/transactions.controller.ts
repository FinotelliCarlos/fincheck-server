import { Body, Controller, Delete, Get, HttpCode, Param, ParseEnumPipe, ParseIntPipe, ParseUUIDPipe, Post, Put, Query } from '@nestjs/common';
import { ActiveUserId } from 'src/shared/decorators/active-user-id.decorator';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { TransactionsService } from './services/transactions.service';
import { OptionalParseUUIDPipe } from 'src/shared/pipes/optional-parse-uuid-pipe';
import { TransactionType } from './entities/transactions.enum';
import { OptionalParseEnumPipe } from 'src/shared/pipes/optional-parse-enum-pipe';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) { }

  @Post()
  create(
    @ActiveUserId() userId: string,
    @Body() createTransactionDto: CreateTransactionDto
  ) {
    return this.transactionsService.create(
      userId,
      createTransactionDto
    );
  }

  @Get()
  findAll(
    @ActiveUserId() userId: string,
    @Query('month', ParseIntPipe) month: number,
    @Query('year', ParseIntPipe) year: number,
    @Query('bankAccountId', OptionalParseUUIDPipe) bankAccountId?: string,
    @Query('type', new OptionalParseEnumPipe(TransactionType)) type?: TransactionType,
  ) {
    return this.transactionsService.findAllByUserId(
      userId, {
      month,
      year,
      bankAccountId,
      type
    });
  }

  @Put(':transactionId')
  update(
    @ActiveUserId() userId: string,
    @Param('transactionId', ParseUUIDPipe) transactionId: string,
    @Body() updateTransactionDto: UpdateTransactionDto
  ) {
    return this.transactionsService.update(
      userId,
      transactionId,
      updateTransactionDto
    );
  }

  @Delete(':transactionId')
  @HttpCode(204)
  remove(
    @ActiveUserId() userId: string,
    @Param('transactionId', ParseUUIDPipe) transactionId: string,
  ) {
    return this.transactionsService.remove(
      userId,
      transactionId
    );
  }
}
