import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import axios from 'axios';
import { UserAgentParserProvider } from './user-agent-parser.provider';

@Injectable()
export class RequestMetadataProvider {
  constructor(
    private readonly userAgentParserProvider: UserAgentParserProvider,
  ) {}

  getIpAddress(request: Request): string {
    const forwardedFor = request.headers['x-forwarded-for'] as string;
    if (forwardedFor) {
      return forwardedFor.split(',')[0].trim();
    }
    const ip = request.ip || 'Unknown';
    if (ip === '::1' || ip === '127.0.0.1') {
      return 'Localhost';
    }
    return ip;
  }

  async getGeolocation(ipAddress: string): Promise<string> {
    try {
      const response = await axios.get(`http://ip-api.com/json/${ipAddress}`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch geolocation:', error.message);
      return 'Unknown';
    }
  }

  getDeviceInfo(userAgent: string): {
    deviceType: string;
    browserName: string;
    operatingSystem: string;
  } {
    return {
      deviceType: this.userAgentParserProvider.getDeviceType(userAgent),
      browserName: this.userAgentParserProvider.getBrowserName(userAgent),
      operatingSystem:
        this.userAgentParserProvider.getOperatingSystem(userAgent),
    };
  }
}
