import { Routes } from "@angular/router";
import { AppComponent } from "./app.component";
import { VideoComponent } from "./video/video.component";
export const routeConfig: Routes = [
    // {
    //     path: '',
    //     component: AppComponent,
    //     title: 'home'
    // },
    {
        path: 'videos',
        component: VideoComponent
    }
];