import './hide-menu';
import './wow';
import './phone-mask';
import './slider';
import './changeContainer';
import './menu-highlighting';
import './buy';
import './timer';
import './price-loading';
import MicroModal from 'micromodal';

if (process.env.NODE_ENV === 'development') {
  //можно бы было watchContentBase в dev-server сделать другой вместо этого
  import('@/index.html');
  import('@/policy.html');
}

import '@/styles/main.scss';

MicroModal.init();
