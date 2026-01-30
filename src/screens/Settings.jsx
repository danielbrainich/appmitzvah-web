import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  toggleModernHolidays,
  toggleMinorFasts,
  toggleRosheiChodesh,
  toggleCandleLighting,
  setCandleLightingTime,
  toggleHavdalahTime,
  setHavdalahTime,
} from '../store/slices/settingsSlice'

export default function Settings({ onClose }) {
  const navigate = useNavigate()
  const handleBack = onClose || (() => navigate(-1))
  const dispatch = useDispatch()
  const settings = useSelector((state) => state.settings)

  const candleDisplayValue = settings.candleLightingToggle
    ? settings.candleLightingTime
    : 18

  const havdalahDisplayValue = settings.havdalahTimeToggle
    ? settings.havdalahTime
    : 42

  return (
    <div className="min-h-screen bg-background-primary">
      <div className="h-11 px-6 flex items-center">
        <button
          onClick={handleBack}
          className="w-9 h-9 rounded-full bg-background-secondary flex items-center justify-center"
        >
          <svg className="w-5 h-5 text-text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>

      <div className="px-3 pb-8 pt-4">
        <SettingsCard title="Holiday Options">
          <SettingSwitch
            label="Include modern holidays"
            checked={settings.modernHolidays}
            onChange={() => dispatch(toggleModernHolidays())}
          />
          <SettingSwitch
            label="Include minor fasts"
            checked={settings.minorFasts}
            onChange={() => dispatch(toggleMinorFasts())}
          />
          <SettingSwitch
            label="Include Roshei Chodesh"
            checked={settings.rosheiChodesh}
            onChange={() => dispatch(toggleRosheiChodesh())}
          />
        </SettingsCard>

        <SettingsCard title="Shabbat Options">
          <SettingSwitch
            label="Custom candle lighting"
            sublabel={`Minutes before sundown: ${candleDisplayValue}`}
            checked={settings.candleLightingToggle}
            onChange={() => dispatch(toggleCandleLighting())}
          />

          {settings.candleLightingToggle && (
            <div className="mb-4 px-2">
              <input
                type="range"
                min="0"
                max="60"
                value={settings.candleLightingTime}
                onChange={(e) => dispatch(setCandleLightingTime(Number(e.target.value)))}
                className="w-full accent-brand-primary"
              />
            </div>
          )}

          <SettingSwitch
            label="Custom shabbat end"
            sublabel={`Minutes after sundown: ${havdalahDisplayValue}`}
            checked={settings.havdalahTimeToggle}
            onChange={() => dispatch(toggleHavdalahTime())}
          />

          {settings.havdalahTimeToggle && (
            <div className="px-2">
              <input
                type="range"
                min="0"
                max="90"
                value={settings.havdalahTime}
                onChange={(e) => dispatch(setHavdalahTime(Number(e.target.value)))}
                className="w-full accent-brand-primary"
              />
            </div>
          )}
        </SettingsCard>

        <div className="py-24 text-center">
          <p className="text-base text-text-muted mb-1">Version 1.0.0</p>
          <a href="https://danielbrainich.com" target="_blank" rel="noopener noreferrer" className="text-base text-text-muted opacity-60 hover:opacity-100 transition-opacity">💙 dbrainich</a>
        </div>
      </div>
    </div>
  )
}

function SettingsCard({ title, children }) {
  return (
    <div className="bg-background-secondary rounded-2xl p-5 mb-4">
      <h3 className="text-lg font-semibold text-text-primary mb-4">{title}</h3>
      {children}
    </div>
  )
}

function SettingSwitch({ label, sublabel, checked, onChange }) {
  return (
    <div className="mb-4 last:mb-0">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-base text-text-primary">{label}</p>
          {sublabel && <p className="text-sm text-text-muted mt-1">{sublabel}</p>}
        </div>
        <button onClick={onChange} className={`w-14 h-8 rounded-full transition-colors ${checked ? 'bg-brand-primary' : 'bg-background-tertiary'}`}>
          <div className={`w-6 h-6 bg-white rounded-full shadow-sm transition-transform ${checked ? 'translate-x-7' : 'translate-x-1'}`} />
        </button>
      </div>
    </div>
  )
}
