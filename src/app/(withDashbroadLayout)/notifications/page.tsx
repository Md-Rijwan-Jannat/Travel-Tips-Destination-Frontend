import Empty from '@/src/components/ui/empty';
import React from 'react';
import Notification from '../_component/module/notifications';

export default function NotificationsPage() {
  return (
    <div>
      <h2 className="p-4 text-lg font-semibold text-default-800">
        Notifications
      </h2>
      <Notification />
    </div>
  );
}
