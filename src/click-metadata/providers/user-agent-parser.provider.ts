import { Injectable } from '@nestjs/common';

@Injectable()
export class UserAgentParserProvider {
  getDeviceType(userAgent: string): string {
    if (/mobile/i.test(userAgent)) {
      return 'Mobile';
    } else if (/tablet/i.test(userAgent)) {
      return 'Tablet';
    } else {
      return 'Desktop';
    }
  }

  getBrowserName(userAgent: string): string {
    if (/chrome/i.test(userAgent)) {
      return 'Chrome';
    } else if (/firefox/i.test(userAgent)) {
      return 'Firefox';
    } else if (/safari/i.test(userAgent)) {
      return 'Safari';
    } else if (/edge/i.test(userAgent)) {
      return 'Edge';
    } else {
      return 'Unknown';
    }
  }

  getOperatingSystem(userAgent: string): string {
    if (/windows/i.test(userAgent)) {
      return 'Windows';
    } else if (/macintosh/i.test(userAgent)) {
      return 'macOS';
    } else if (/linux/i.test(userAgent)) {
      return 'Linux';
    } else if (/android/i.test(userAgent)) {
      return 'Android';
    } else if (/ios/i.test(userAgent)) {
      return 'iOS';
    } else {
      return 'Unknown';
    }
  }
}
