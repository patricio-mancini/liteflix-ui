type AsyncComponent<P> = (props: P) => Promise<JSX.Element>;

async function resolvedComponent<P>(Component: AsyncComponent<P>, props: P): Promise<() => JSX.Element> {
  const ComponentResolved = await Component(props);
  return () => ComponentResolved;
}

export default resolvedComponent;
