import { useState, type ReactElement, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { signUp, signInWithGoogle, signInWithKakao } from '../utils/auth';
import SEOHead from '../components/SEOHead';
import '../styles/auth.css';

const Register = (): ReactElement | null => {
  const { t } = useLanguage();
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: '', password: '', passwordConfirm: '', displayName: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  if (isLoggedIn) {
    navigate('/', { replace: true });
    return null;
  }

  const handleSocialSignUp = async (provider: 'google' | 'kakao') => {
    setError('');
    try {
      if (provider === 'google') await signInWithGoogle();
      else await signInWithKakao();
    } catch (err) {
      setError((err as Error).message || t('auth.signUpError'));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (form.password !== form.passwordConfirm) {
      setError(t('auth.passwordMismatch'));
      return;
    }
    if (!/^(?=.*[a-zA-Z])(?=.*\d).{8,}$/.test(form.password)) {
      setError('비밀번호는 8자 이상, 영문과 숫자를 포함해야 합니다.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await signUp(form.email, form.password, form.displayName);
      setSuccess(true);
    } catch (err) {
      setError((err as Error).message || t('auth.signUpError'));
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <section className="auth-fullpage">
        <div className="auth-center-wrapper">
          <div className="auth-card-google">
            <div className="auth-success">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="48" height="48">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              <h2>{t('auth.signUpSuccess')}</h2>
              <p>{t('auth.checkEmail')}</p>
              <Link to="/login" className="auth-next-btn auth-btn-full">
                {t('auth.goToLogin')}
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
    <SEOHead title="회원가입" path="/register" noindex />
    <section className="auth-fullpage">
      <div className="auth-center-wrapper">
        <div className="auth-card-google">
          <div className="auth-logo-area">
            <span className="brand-dream">Dream</span>
            <span className="brand-it">IT</span>{' '}
            <span className="brand-biz">Biz</span>
          </div>
          <h2 className="auth-heading">{t('auth.signUpTitle')}</h2>
          <p className="auth-sub">{t('auth.signUpSubtitle')}</p>

          {/* 소셜 가입: 구글 / 카카오 (신규 계정은 첫 로그인 시 자동 생성) */}
          <div className="auth-methods">
            <button type="button" className="auth-method-btn google" onClick={() => handleSocialSignUp('google')}>
              <svg viewBox="0 0 24 24" width="20" height="20">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <span>Google로 가입</span>
            </button>
            <button type="button" className="auth-method-btn kakao" onClick={() => handleSocialSignUp('kakao')}>
              <svg viewBox="0 0 24 24" width="20" height="20">
                <path d="M12 3C6.48 3 2 6.58 2 10.9c0 2.78 1.8 5.22 4.52 6.6-.2.74-.72 2.68-.82 3.1-.13.5.18.49.38.36.16-.1 2.5-1.7 3.5-2.4.78.12 1.58.18 2.42.18 5.52 0 10-3.58 10-7.9S17.52 3 12 3z" fill="#3C1E1E"/>
              </svg>
              <span>카카오로 가입</span>
            </button>
          </div>

          <div className="auth-divider"><span>{t('auth.or')}</span></div>

          <form onSubmit={handleSubmit} className="auth-email-form">
            <div className="auth-input-group">
              <input
                type="text"
                value={form.displayName}
                onChange={e => setForm({ ...form, displayName: e.target.value })}
                placeholder={t('auth.displayNamePlaceholder')}
                required
                autoFocus
              />
            </div>
            <div className="auth-input-group">
              <input
                type="email"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                placeholder={t('auth.emailPlaceholder')}
                required
              />
            </div>
            <div className="auth-input-group">
              <input
                type="password"
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                placeholder={t('auth.passwordPlaceholder')}
                minLength={8}
                required
              />
            </div>
            <div className="auth-input-group">
              <input
                type="password"
                value={form.passwordConfirm}
                onChange={e => setForm({ ...form, passwordConfirm: e.target.value })}
                placeholder={t('auth.passwordConfirmPlaceholder')}
                required
              />
            </div>

            {error && <div className="auth-error">{error}</div>}

            <button type="submit" className="auth-next-btn auth-btn-full" disabled={loading}>
              {loading ? t('auth.signingUp') : t('auth.signUp')}
            </button>
          </form>

          <div className="auth-bottom-link">
            <span>{t('auth.hasAccount')}</span>
            <Link to="/login">{t('auth.login')}</Link>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default Register;
