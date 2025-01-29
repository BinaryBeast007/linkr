import { forwardRef, Module } from '@nestjs/common';
import { ClickMetadataController } from './click-metadata.controller';
import { ClickMetadataService } from './providers/click-metadata.service';
import { UserAgentParserProvider } from './providers/user-agent-parser.provider';
import { RequestMetadataProvider } from './providers/request-metadata.provider';
import { ClickMetadata } from './click-metadata.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShortUrlsModule } from 'src/short-urls/short-urls.module';

@Module({
  controllers: [ClickMetadataController],
  providers: [
    ClickMetadataService,
    UserAgentParserProvider,
    RequestMetadataProvider,
  ],
  imports: [
    TypeOrmModule.forFeature([ClickMetadata]),
    forwardRef(() => ShortUrlsModule),
  ],
  exports: [ClickMetadataService],
})
export class ClickMetadataModule {}
