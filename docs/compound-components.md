# Compound Components — AgentComposerUI

Every composer in AgentComposerUI ships both as a **Drop-in Component** and as a **Compound Component** suite for deep customization.

## Drop-in API vs Compound Component API

### Drop-in (Fastest)
```tsx
<LinkedInComposer
  data={data}
  status={status}
  onApprove={handleApprove}
  onReject={handleReject}
/>
```

### Compound Components (Full Layout Control)
```tsx
<LinkedInComposer.Root data={data} status={status} onApprove={handleApprove} onReject={handleReject}>
  <div className="custom-wrapper border-2 border-indigo-500 rounded-2xl p-4">
    <LinkedInComposer.Header />
    <LinkedInComposer.Author />
    <LinkedInComposer.Editor />
    <LinkedInComposer.Preview />
    <LinkedInComposer.Actions>
      <LinkedInComposer.RejectButton />
      <LinkedInComposer.ApproveButton />
    </LinkedInComposer.Actions>
  </div>
</LinkedInComposer.Root>
```

## Available Subcomponents by Composer

### LinkedInComposer
- `LinkedInComposer.Root`
- `LinkedInComposer.Header`
- `LinkedInComposer.Author`
- `LinkedInComposer.Editor`
- `LinkedInComposer.Preview`
- `LinkedInComposer.Actions`
- `LinkedInComposer.RejectButton`
- `LinkedInComposer.ApproveButton`

### TwitterThreadComposer
- `TwitterThreadComposer.Root`
- `TwitterThreadComposer.Header`
- `TwitterThreadComposer.Author`
- `TwitterThreadComposer.Editor`
- `TwitterThreadComposer.CountdownRing`
- `TwitterThreadComposer.Preview`
- `TwitterThreadComposer.Actions`
- `TwitterThreadComposer.RejectButton`
- `TwitterThreadComposer.ApproveButton`

### EmailOutreachComposer
- `EmailOutreachComposer.Root`
- `EmailOutreachComposer.Header`
- `EmailOutreachComposer.SubjectAnalyzer`
- `EmailOutreachComposer.TokensBar`
- `EmailOutreachComposer.Editor`
- `EmailOutreachComposer.Preview`
- `EmailOutreachComposer.Actions`
- `EmailOutreachComposer.RejectButton`
- `EmailOutreachComposer.ApproveButton`

### GitHubPRComposer
- `GitHubPRComposer.Root`
- `GitHubPRComposer.Header`
- `GitHubPRComposer.Editor`
- `GitHubPRComposer.Checklist`
- `GitHubPRComposer.MetaSidebar`
- `GitHubPRComposer.Preview`
- `GitHubPRComposer.Actions`
- `GitHubPRComposer.RejectButton`
- `GitHubPRComposer.ApproveButton`
