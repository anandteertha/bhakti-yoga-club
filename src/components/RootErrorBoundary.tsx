import { Component, type ErrorInfo, type ReactNode } from "react";

type Props = { children: ReactNode };
type State = { error: Error | null };

export class RootErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(error, info.componentStack);
  }

  render() {
    if (this.state.error) {
      return (
        <div className="min-h-screen bg-amber-50 px-4 py-16 text-slate-900">
          <div className="mx-auto max-w-lg rounded-2xl border border-amber-200 bg-white p-8 shadow-sm">
            <h1 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-emerald-950">
              Something went wrong
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              The app hit a runtime error. Open the browser developer console (F12) for details, then try{" "}
              <strong className="text-slate-800">refreshing the page</strong>.
            </p>
            <pre className="mt-6 overflow-x-auto rounded-lg bg-slate-100 p-4 text-xs text-slate-800">
              {this.state.error.message}
            </pre>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
