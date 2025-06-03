import { Button } from '@/components/ui/button';
import { Icons } from '@/components/shared/oauth-buttons';
import { signIn } from '@/lib/auth-client';

export default function SocialButtons() {
  const signInWithOAuth = async (provider: 'github' | 'google') => {
    await signIn.social({
      provider: provider,
    });
  };

  return (
    <div className='mt-6 grid grid-cols-2 gap-3'>
      <Button
        onClick={() => signInWithOAuth('google')}
        type='button'
        variant='outline'
      >
        <Icons.google />
        <span>Google</span>
      </Button>
      <Button
        onClick={() => signInWithOAuth('github')}
        type='button'
        variant='outline'
      >
        <Icons.gitHub />
        <span>Github</span>
      </Button>
    </div>
  );
}
