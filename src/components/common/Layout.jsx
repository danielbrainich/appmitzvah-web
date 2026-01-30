import React from 'react'
import { Outlet } from 'react-router-dom'
import TopBar from './TopBar'
import TabBar from './TabBar'

export default function Layout() {
    return (
        <div className="min-h-screen bg-background-primary text-text-primary flex flex-col">
            <TopBar />

            <main className="flex-1 pt-12 pb-20">
                <Outlet />
            </main>

            <TabBar />
        </div>
    )
}