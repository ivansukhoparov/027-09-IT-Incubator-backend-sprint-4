import { SecurityDevicesOutput, SecuritySessionType } from './output';
import { SessionDocument } from '../infrastructure/devices.schema';
import { WithId } from 'mongodb';

export const securityMapper = (
  session: WithId<SecuritySessionType>,
): SecurityDevicesOutput => {
  return {
    deviceId: session.deviceId,
    ip: session.ip,
    lastActiveDate: new Date(session.lastActiveDate).toISOString(),
    title: session.deviceTitle,
  };
};
