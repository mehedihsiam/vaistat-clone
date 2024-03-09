import React from 'react';
import ArrowLeft from './icons/arrow-left.svg';
import BarCode from './icons/bar-code.svg';
import Camera from './icons/camera.svg';
import CarSimpleFill from './icons/car-simple-fill.svg';
import CarSimple from './icons/car-simple.svg';
import CaretDown from './icons/caret-down-fill.svg';
import CaretRight from './icons/caret-right.svg';
import CaretUp from './icons/caret-up.svg';
import ChatFill from './icons/chat-circle-text-fill.svg';
import Chat from './icons/chat-circle-text.svg';
import Check from './icons/check.svg';
import CheckRound from './icons/checkRound.svg';
import Close from './icons/close.svg';
import EyeClose from './icons/eye-close.svg';
import Eye from './icons/eye.svg';
import FlagCanada from './icons/flag-canada.svg';
import HouseFill from './icons/house-fill.svg';
import House from './icons/house.svg';
import List from './icons/list.svg';
import NFC from './icons/nfc.svg';
import QRCode from './icons/qr-code.svg';
import Route from './icons/route.svg';
import Download from './icons/download.svg';
import Send from './icons/send.svg';
import Trash from './icons/trash.svg';
import UserRegular from './icons/user-regular.svg';

import Pencil from './icons/pencil.svg';
import Car from './icons/car.svg';
import Bicycle from './icons/bicycle.svg';
import Scooter from './icons/scooter.svg';
import Translate from './icons/translate.svg';
import LocationPharmacy from './icons/location-pharmacy.svg';
import LocationDelivery from './icons/location-delivery.svg';

import ArrowRight from './icons/arrow-right.svg';
import Calendar from './icons/calendar.svg';
import DeleteSquare from './icons/delete-square.svg';
import Error from './icons/error.svg';
import Export from './icons/export.svg';
import FAQ from './icons/faq.svg';
import FlashOff from './icons/flash-off.svg';
import Flash from './icons/flash.svg';
import Funnel from './icons/funnel.svg';
import Info from './icons/info.svg';
import Language from './icons/language.svg';
import ListBullet from './icons/list-bullet.svg';
import LocationCircle from './icons/location-circle.svg';
import Location from './icons/location.svg';
import Lock from './icons/lock-outline.svg';
import Logout from './icons/logout.svg';
import Map from './icons/map.svg';
import NFCTap from './icons/nfc-tap.svg';
import Notification from './icons/notification.svg';
import PackageFill from './icons/package-fill.svg';
import Package from './icons/package.svg';
import PasswordStar from './icons/password-start.svg';
import Plus from './icons/plus.svg';
import ProfileFill from './icons/profile-fill.svg';
import Profile from './icons/profile.svg';
import QrCodeArea from './icons/qr-code-area.svg';
import Settings from './icons/settings.svg';
import Siren from './icons/siren.svg';
import Success from './icons/success.svg';
import Summary from './icons/summery.svg';
import Terms from './icons/terms.svg';
import UserFocus from './icons/user-focus.svg';
import UserListFill from './icons/user-list-fill.svg';
import UserList from './icons/user-list.svg';
import User from './icons/user.svg';
import Warning from './icons/warning.svg';
import MyLocation from './icons/my_location.svg';

import TickOutline from './icons/tick-outline.svg';
import VaistatLogo3DBlack from './icons/vaistat-three-d-black.svg';
import VaistatLogo3D from './icons/vaistat-three-d.svg';
// images
import PhoneWhite from './icons/PhoneWhite.svg';
import ScrollArrow from './icons/ScrollArrow.svg';
import Import from './icons/import.svg';
import Mic from './icons/mic.svg';
import Mobile from './icons/mobile.svg';
import Phone from './icons/phone.svg';
import Tick from './icons/tick.svg';
import TickInCircle from './icons/tickInCircle.svg';
import DeliveryConfirm from './images/deliveryConfirm.svg';
import DiscoverCard from './images/discover-card.svg';
import Facebook from './images/facebook.svg';
import Google from './images/google.svg';
import VaistatLogo from './images/logo.svg';
import MaestroCard from './images/maestro-card.svg';
import Mastercard from './images/mastercard.svg';
import OrderFulfill from './images/orderFullfill.svg';
import RouteCar from './images/routeCar.svg';
import VaistatNFC from './images/vaistat-nfc.svg';
import VisaCard from './images/visa-card.svg';
import Clock from './icons/clock.svg';
import Completed from './icons/completed.svg';
import Down from './icons/down.svg';
import TransferRight from './icons/transfer-right.svg';
import Pharmacy from './icons/pharmacy.svg';
import DeliveryTruck from './icons/delivery-truck.svg';

const SVGs = {
  ArrowLeft: (height?: number, width?: number, color = 'black') => (
    <ArrowLeft height={height} width={width} color={color} />
  ),
  BarCode: (height?: number, width?: number, color = 'black') => (
    <BarCode height={height} width={width} color={color} />
  ),
  UserRegular: (height?: number, width?: number, color = 'black') => (
    <UserRegular height={height} width={width} color={color} />
  ),
  Down: (height?: number, width?: number, color = 'black') => (
    <Down height={height} width={width} color={color} />
  ),
  Completed: (height?: number, width?: number, color = 'black') => (
    <Completed height={height} width={width} color={color} />
  ),
  LocationPharmacy: (height?: number, width?: number, color = 'black') => (
    <LocationPharmacy height={height} width={width} color={color} />
  ),
  LocationDelivery: (height?: number, width?: number, color = 'black') => (
    <LocationDelivery height={height} width={width} color={color} />
  ),
  DeliveryTruck: (height?: number, width?: number, color = 'black') => (
    <DeliveryTruck height={height} width={width} color={color} />
  ),
  MyLocation: (height?: number, width?: number, color = 'black') => (
    <MyLocation height={height} width={width} color={color} />
  ),
  TransferRight: (height?: number, width?: number, color = 'black') => (
    <TransferRight height={height} width={width} color={color} />
  ),
  QRCode: (height?: number, width?: number, color = 'black') => (
    <QRCode height={height} width={width} color={color} />
  ),
  QrCodeArea: (height?: number, width?: number, color = 'black') => (
    <QrCodeArea height={height} width={width} color={color} />
  ),
  Route: (height?: number, width?: number, color = 'black') => (
    <Route height={height} width={width} color={color} />
  ),
  NFCTap: (height?: number, width?: number, color = 'black') => (
    <NFCTap height={height} width={width} color={color} />
  ),
  Translate: (height?: number, width?: number, color = 'black') => (
    <Translate height={height} width={width} color={color} />
  ),
  Camera: (height?: number, width?: number, color = 'black') => (
    <Camera height={height} width={width} color={color} />
  ),
  Send: (height?: number, width?: number, color = 'black') => (
    <Send height={height} width={width} color={color} />
  ),
  TickOutline: (height?: number, width?: number, color = 'black') => (
    <TickOutline height={height} width={width} color={color} />
  ),
  Calendar: (height?: number, width?: number, color = 'black') => (
    <Calendar height={height} width={width} color={color} />
  ),
  Pharmacy: (height?: number, width?: number, color = 'black') => (
    <Pharmacy height={height} width={width} color={color} />
  ),
  Error: (height?: number, width?: number, color = 'black') => (
    <Error height={height} width={width} color={color} />
  ),
  Info: (height?: number, width?: number, color = 'black') => (
    <Info height={height} width={width} color={color} />
  ),
  Warning: (height?: number, width?: number, color = 'black') => (
    <Warning height={height} width={width} color={color} />
  ),
  Success: (height?: number, width?: number, color = 'black') => (
    <Success height={height} width={width} color={color} />
  ),
  Funnel: (height?: number, width?: number, color = 'black') => (
    <Funnel height={height} width={width} color={color} />
  ),
  Plus: (height?: number, width?: number, color = 'black') => (
    <Plus height={height} width={width} color={color} />
  ),
  CarSimpleFill: (height?: number, width?: number, color = 'black') => (
    <CarSimpleFill height={height} width={width} color={color} />
  ),
  CarSimple: (height?: number, width?: number, color = 'black') => (
    <CarSimple height={height} width={width} color={color} />
  ),
  CaretDown: (height?: number, width?: number, color = 'black') => (
    <CaretDown height={height} width={width} color={color} />
  ),
  CaretRight: (height?: number, width?: number, color = 'black') => (
    <CaretRight height={height} width={width} color={color} />
  ),
  Location: (height?: number, width?: number, color = 'black') => (
    <Location height={height} width={width} color={color} />
  ),
  CaretUp: (height?: number, width?: number, color = 'black') => (
    <CaretUp height={height} width={width} color={color} />
  ),
  ChatFill: (height?: number, width?: number, color = 'black') => (
    <ChatFill height={height} width={width} color={color} />
  ),
  Close: (height?: number, width?: number, color = 'black') => (
    <Close height={height} width={width} color={color} />
  ),
  Chat: (height?: number, width?: number, color = 'black') => (
    <Chat height={height} width={width} color={color} />
  ),
  Check: (height?: number, width?: number, color = 'black') => (
    <Check height={height} width={width} color={color} />
  ),
  CheckRound: (height?: number, width?: number, color = 'black') => (
    <CheckRound height={height} width={width} color={color} />
  ),
  Flash: (height?: number, width?: number, color = 'black') => (
    <Flash height={height} width={width} color={color} />
  ),
  FlashOff: (height?: number, width?: number, color = 'black') => (
    <FlashOff height={height} width={width} color={color} />
  ),
  EyeClose: (height?: number, width?: number, color = 'black') => (
    <EyeClose height={height} width={width} color={color} />
  ),
  Download: (height?: number, width?: number, color = 'black') => (
    <Download height={height} width={width} color={color} />
  ),
  User: (height?: number, width?: number, color = 'black') => (
    <User height={height} width={width} color={color} />
  ),
  Settings: (height?: number, width?: number, color = 'black') => (
    <Settings height={height} width={width} color={color} />
  ),
  Eye: (height?: number, width?: number, color = 'black') => (
    <Eye height={height} width={width} color={color} />
  ),
  FlagCanada: (height?: number, width?: number, color = 'black') => (
    <FlagCanada height={height} width={width} color={color} />
  ),
  HouseFill: (height?: number, width?: number, color = 'black') => (
    <HouseFill height={height} width={width} color={color} />
  ),
  House: (height?: number, width?: number, color = 'black') => (
    <House height={height} width={width} color={color} />
  ),
  List: (height?: number, width?: number, color = 'black') => (
    <List height={height} width={width} color={color} />
  ),
  ListBullet: (height?: number, width?: number, color = 'black') => (
    <ListBullet height={height} width={width} color={color} />
  ),
  Lock: (height?: number, width?: number, color = 'black') => (
    <Lock height={height} width={width} color={color} />
  ),
  Map: (height?: number, width?: number, color = 'black') => (
    <Map height={height} width={width} color={color} />
  ),
  Pencil: (height?: number, width?: number, color = 'black') => (
    <Pencil height={height} width={width} color={color} />
  ),
  Siren: (height?: number, width?: number, color = 'black') => (
    <Siren height={height} width={width} color={color} />
  ),

  Facebook: (height?: number, width?: number, color = 'black') => (
    <Facebook height={height} width={width} color={color} />
  ),
  Google: (height?: number, width?: number, color = 'black') => (
    <Google height={height} width={width} color={color} />
  ),
  VaistatLogo: (height?: number, width?: number, color = 'black') => (
    <VaistatLogo height={height} width={width} color={color} />
  ),
  OrderFulfill: (height?: number, width?: number, color = 'black') => (
    <OrderFulfill height={height} width={width} color={color} />
  ),
  Car: (height?: number, width?: number, color = 'black') => (
    <Car height={height} width={width} color={color} />
  ),
  Bicycle: (height?: number, width?: number, color = 'black') => (
    <Bicycle height={height} width={width} color={color} />
  ),
  Scooter: (height?: number, width?: number, color = 'black') => (
    <Scooter height={height} width={width} color={color} />
  ),
  RouteCar: (height?: number, width?: number, color = 'black') => (
    <RouteCar height={height} width={width} color={color} />
  ),
  DeliveryConfirm: (height?: number, width?: number, color = 'black') => (
    <DeliveryConfirm height={height} width={width} color={color} />
  ),
  ArrowRight: (height?: number, width?: number, color = 'black') => (
    <ArrowRight height={height} width={width} color={color} />
  ),
  Language: (height?: number, width?: number, color = 'black') => (
    <Language height={height} width={width} color={color} />
  ),
  Profile: (height?: number, width?: number, color = 'black') => (
    <Profile height={height} width={width} color={color} />
  ),
  ProfileFill: (height?: number, width?: number, color = 'black') => (
    <ProfileFill height={height} width={width} color={color} />
  ),
  LocationCircle: (height?: number, width?: number, color = 'black') => (
    <LocationCircle height={height} width={width} color={color} />
  ),
  PasswordStar: (height?: number, width?: number, color = 'black') => (
    <PasswordStar height={height} width={width} color={color} />
  ),
  Notification: (height?: number, width?: number, color = 'black') => (
    <Notification height={height} width={width} color={color} />
  ),
  PackageFill: (height?: number, width?: number, color = 'black') => (
    <PackageFill height={height} width={width} color={color} />
  ),
  Package: (height?: number, width?: number, color = 'black') => (
    <Package height={height} width={width} color={color} />
  ),
  Summary: (height?: number, width?: number, color = 'black') => (
    <Summary height={height} width={width} color={color} />
  ),
  Export: (height?: number, width?: number, color = 'black') => (
    <Export height={height} width={width} color={color} />
  ),
  Trash: (height?: number, width?: number, color = 'black') => (
    <Trash height={height} width={width} color={color} />
  ),
  FAQ: (height?: number, width?: number, color = 'black') => (
    <FAQ height={height} width={width} color={color} />
  ),
  Terms: (height?: number, width?: number, color = 'black') => (
    <Terms height={height} width={width} color={color} />
  ),
  UserFocus: (height?: number, width?: number, color = 'black') => (
    <UserFocus height={height} width={width} color={color} />
  ),
  UserListFill: (height?: number, width?: number, color = 'black') => (
    <UserListFill height={height} width={width} color={color} />
  ),
  UserList: (height?: number, width?: number, color = 'black') => (
    <UserList height={height} width={width} color={color} />
  ),
  VaistatLogo3DBlack: (height?: number, width?: number, color = 'black') => (
    <VaistatLogo3DBlack height={height} width={width} color={color} />
  ),
  VaistatLogo3D: (height?: number, width?: number, color = 'black') => (
    <VaistatLogo3D height={height} width={width} color={color} />
  ),
  DeleteSquare: (height?: number, width?: number, color = 'black') => (
    <DeleteSquare height={height} width={width} color={color} />
  ),
  Logout: (height?: number, width?: number, color = 'black') => (
    <Logout height={height} width={width} color={color} />
  ),
  Mobile: (height?: number, width?: number, color = 'black') => (
    <Mobile height={height} width={width} color={color} />
  ),
  Phone: (height?: number, width?: number, color = 'black') => (
    <Phone height={height} width={width} color={color} />
  ),
  NFC: (height?: number, width?: number, color = 'black') => (
    <NFC height={height} width={width} color={color} />
  ),
  PhoneWhite: (height?: number, width?: number, color = 'black') => (
    <PhoneWhite height={height} width={width} color={color} />
  ),
  Tick: (height?: number, width?: number, color = 'black') => (
    <Tick height={height} width={width} color={color} />
  ),
  ScrollArrow: (height?: number, width?: number, color = 'black') => (
    <ScrollArrow height={height} width={width} color={color} />
  ),
  DiscoverCard: (height?: number, width?: number, color = 'black') => (
    <DiscoverCard height={height} width={width} color={color} />
  ),
  MaestroCard: (height?: number, width?: number, color = 'black') => (
    <MaestroCard height={height} width={width} color={color} />
  ),
  Mastercard: (height?: number, width?: number, color = 'black') => (
    <Mastercard height={height} width={width} color={color} />
  ),
  VisaCard: (height?: number, width?: number, color = 'black') => (
    <VisaCard height={height} width={width} color={color} />
  ),
  VaistatNFC: (height?: number, width?: number, color = 'black') => (
    <VaistatNFC height={height} width={width} color={color} />
  ),
  Import: (height?: number, width?: number, color = 'black') => (
    <Import height={height} width={width} color={color} />
  ),
  Mic: (height?: number, width?: number, color = 'black') => (
    <Mic height={height} width={width} color={color} />
  ),
  TickInCircle: (height?: number, width?: number, color = 'black') => (
    <TickInCircle height={height} width={width} color={color} />
  ),
  Clock: (height?: number, width?: number, color = 'black') => (
    <Clock height={height} width={width} color={color} />
  ),
};

export default SVGs;
