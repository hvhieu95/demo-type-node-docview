import React from 'react';


import { ReactComponent as GridIconSvg } from './assets/Icons_grid.svg';
import { ReactComponent as SearchIconSvg } from './assets/Icons_search.svg';
import { ReactComponent as SettingsIconSvg } from './assets/Icons_setting.svg';
import { ReactComponent as UserIconSvg } from './assets/icons_user.svg';
import { ReactComponent as CreateIconSvg } from './assets/icons_create.svg';
import {ReactComponent as SortIconSvg}  from "./assets/icons_sort.svg"
import {ReactComponent as RadioOpenSvg}  from "./assets/radio_open.svg"
import {ReactComponent as RadioCloseSvg}  from "./assets/radio_close.svg"
import {ReactComponent as RadioDoingSvg} from "./assets/radio_doing.svg"
import {ReactComponent as RadioCompletedSvg} from "./assets/radio_completed.svg"
import {ReactComponent as IconUploadSvg} from "./assets/icon_upload.svg"
import {ReactComponent as IconConvertSvg} from "./assets/icon_convert.svg"
import {ReactComponent as IconCreateShapeSvg}  from "./assets/Icons_createshape.svg"
import {ReactComponent as IconAvatarAssignerSvg}  from "./assets/icon_assigner.svg"
import {ReactComponent as IconVersionSvg}  from "./assets/Icon_version.svg"
import {ReactComponent as IconTaskSvg}  from "./assets/Icon_task.svg"

export const GridIcon = React.memo(() => <GridIconSvg  />);
export const SearchIcon = React.memo(() => <SearchIconSvg  />);
export const SettingsIcon = React.memo(() => <SettingsIconSvg  />);
export const UserIcon = React.memo(() => <UserIconSvg  />);
export const CreateIcon = React.memo(() => <CreateIconSvg  />);
export const SortIcon = React.memo(() => <SortIconSvg  />);
export const IconUpload = React.memo(() => <IconUploadSvg  />); 
export const IconConvert = React.memo(() => <IconConvertSvg  />); 
export const IconCreateShape = React.memo(() => <IconCreateShapeSvg  />); 
export const IconAvatarAssigner = React.memo(() => <IconAvatarAssignerSvg  />); 
export const IconVersion = React.memo(() => <IconVersionSvg  />); 
export const IconTask = React.memo(() => <IconTaskSvg  />); 
export const RadioOpen = React.memo((props: React.SVGProps<SVGSVGElement>) => <RadioOpenSvg {...props} />);
export const RadioClose = React.memo((props: React.SVGProps<SVGSVGElement>) => <RadioCloseSvg {...props} />);
export const RadioDoing = React.memo((props: React.SVGProps<SVGSVGElement>) => <RadioDoingSvg {...props} />);
export const RadioCompleted = React.memo((props: React.SVGProps<SVGSVGElement>) => <RadioCompletedSvg {...props} />);