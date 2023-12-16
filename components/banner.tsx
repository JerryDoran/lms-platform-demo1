import { AlertTriangle, CheckCircleIcon } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const bannerVariants = cva(
  'border text-center p-4 text-sm flex items-center w-full',
  {
    variants: {
      variant: {
        // default: 'bg-slate-100 text-slate-800 border-slate-200',
        success: 'bg-emerald-100 text-emerald-800 border-emerald-200',
        warning: 'bg-amber-100 text-amber-800 border-amber-200',
        // danger: 'bg-rose-100 text-rose-800 border-rose-200',
      },
    },
    defaultVariants: {
      variant: 'warning',
    },
  }
);

type BannerProps = VariantProps<typeof bannerVariants> & {
  label: string;
};

const iconMap = {
  warning: AlertTriangle,
  success: CheckCircleIcon,
};

export default function Banner({ label, variant }: BannerProps) {
  const Icon = iconMap[variant || 'warning'];
  return (
    <div className={cn(bannerVariants({ variant }))}>
      <Icon className='h-4 w-4 mr-2' />
      {label}
    </div>
  );
}
