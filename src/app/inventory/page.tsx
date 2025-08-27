import { Sidebar } from '@/components/sidebar/sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Filter, Upload, MoreHorizontal, PlusCircle } from 'lucide-react';

const inventoryData = [
    {
        sku: 'PAR-IP15-PAN',
        name: 'Pantalla iPhone 15',
        unit: 'PZA',
        price: '$150.00',
        stock: 15,
    },
    {
        sku: 'ACC-CAB-USBC',
        name: 'Cable USB-C 1m',
        unit: 'PZA',
        price: '$25.00',
        stock: 250,
    },
    {
        sku: 'EQU-SAM-S24',
        name: 'Samsung Galaxy S24',
        unit: 'PZA',
        price: '$1200.00',
        stock: 2,
    },
    {
        sku: 'HER-DES-01',
        name: 'Kit Desarmadores Precisión',
        unit: 'KIT',
        price: '$40.00',
        stock: 0,
    },
    {
        sku: 'SRV-DIAG-01',
        name: 'Servicio de Diagnóstico',
        unit: 'SRV',
        price: '$20.00',
        stock: 0,
    },
    {
        sku: 'PAR-SAM-S22-BAT',
        name: 'Batería Samsung S22',
        unit: 'PZA',
        price: '$80.00',
        stock: 0,
    },
    {
        sku: 'ACC-CARG-30W',
        name: 'Cargador 30W',
        unit: 'PZA',
        price: '$35.00',
        stock: 0,
    },
];

export default function InventoryPage() {
    return (
        <div className="flex min-h-screen w-full">
            <Sidebar />
            <div className="flex flex-1 flex-col bg-background">
                <header className="sticky top-0 flex h-16 items-center justify-end gap-4 border-b bg-background px-4 md:px-6 z-10">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                        <Button variant="secondary" size="icon" className="rounded-full">
                            <Avatar>
                            <AvatarFallback>AD</AvatarFallback>
                            </Avatar>
                            <span className="sr-only">Toggle user menu</span>
                        </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                        <DropdownMenuItem>My Account</DropdownMenuItem>
                        <DropdownMenuItem>Settings</DropdownMenuItem>
                        <DropdownMenuItem>Logout</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </header>
                <main className="flex-1 p-4 md:p-8">
                    <Tabs defaultValue="inventory">
                        <TabsList className="mb-4">
                            <TabsTrigger value="inventory">Inventario</TabsTrigger>
                            <TabsTrigger value="audit">Auditoría</TabsTrigger>
                        </TabsList>
                    </Tabs>
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle>Inventario</CardTitle>
                                    <CardDescription>Gestiona tus productos, refacciones, accesorios y equipos.</CardDescription>
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="outline">
                                        <Filter className="mr-2 h-4 w-4" />
                                        Filtrar
                                    </Button>
                                    <Button variant="outline">
                                        <Upload className="mr-2 h-4 w-4" />
                                        Exportar
                                    </Button>
                                    <Button className="bg-destructive hover:bg-destructive/90 text-destructive-foreground">
                                        <PlusCircle className="mr-2 h-4 w-4" />
                                        Agregar Movimiento
                                    </Button>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>SKU</TableHead>
                                        <TableHead>Nombre</TableHead>
                                        <TableHead>Unidad</TableHead>
                                        <TableHead>Precio</TableHead>
                                        <TableHead>Existencia</TableHead>
                                        <TableHead><span className="sr-only">Actions</span></TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {inventoryData.map((item) => (
                                        <TableRow key={item.sku}>
                                            <TableCell className="font-medium text-destructive underline">{item.sku}</TableCell>
                                            <TableCell>{item.name}</TableCell>
                                            <TableCell>{item.unit}</TableCell>
                                            <TableCell>{item.price}</TableCell>
                                            <TableCell>
                                                <Badge variant={item.stock > 0 ? "default" : "destructive"} className={item.stock > 0 ? "bg-primary" : "bg-destructive"}>
                                                    {item.stock}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" className="h-8 w-8 p-0">
                                                            <span className="sr-only">Open menu</span>
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem>Ver Detalles</DropdownMenuItem>
                                                        <DropdownMenuItem>Ajustar Existencia</DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            <div className="pt-4 text-sm text-muted-foreground">
                                Mostrando 1-7 de 7 productos
                            </div>
                        </CardContent>
                    </Card>
                </main>
            </div>
        </div>
    );
}